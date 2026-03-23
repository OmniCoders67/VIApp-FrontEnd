import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

const DEFAULT_COURSES = [
    'MAL',
    'ESW',
    'WEB2',
    'PRO3',
    'Docker',
];

const generateToken = () => Math.random().toString(36).substring(2, 10).toUpperCase();

export default function AdminQRScreen() {
    const insets = useSafeAreaInsets();
    const [courses, setCourses] = useState(DEFAULT_COURSES);
    const [selectedCourse, setSelectedCourse] = useState(DEFAULT_COURSES[0]);
    const [newCourse, setNewCourse] = useState('');
    const [token, setToken] = useState(generateToken());
    const [isRunning, setIsRunning] = useState(false);
    const [countdown, setCountdown] = useState(1);

    const qrValue = `${selectedCourse}|${token}`;

    // Token rotation
    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => setToken(generateToken()), 1000);
        return () => clearInterval(interval);
    }, [isRunning]);

    // Countdown display
    useEffect(() => {
        if (!isRunning) { setCountdown(1); return; }
        setCountdown(1);
        const tick = setInterval(() => {
            setCountdown(prev => prev <= 0.1 ? 1 : Math.round((prev - 0.1) * 10) / 10);
        }, 100);
        return () => clearInterval(tick);
    }, [token, isRunning]);

    const handleAddCourse = () => {
        const trimmed = newCourse.trim();
        if (!trimmed) return;
        if (courses.includes(trimmed)) {
            Alert.alert('Already exists', 'This course is already in the list.');
            return;
        }
        setCourses(prev => [...prev, trimmed]);
        setSelectedCourse(trimmed);
        setNewCourse('');
        setIsRunning(false);
    };

    const handleRemoveCourse = (course: string) => {
        Alert.alert('Remove Course', `Remove "${course}" from the list?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Remove', style: 'destructive', onPress: () => {
                    const updated = courses.filter(c => c !== course);
                    setCourses(updated);
                    if (selectedCourse === course) {
                        setSelectedCourse(updated[0] || '');
                        setIsRunning(false);
                    }
                }
            },
        ]);
    };

    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
                styles.container,
                { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 32 },
            ]}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(tabs)/main")}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Image source={require('../Photo/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>

            <Text style={styles.title}>ADMIN — QR GENERATOR</Text>

            {/* Add new course */}
            <Text style={styles.sectionLabel}>ADD COURSE</Text>
            <View style={styles.addRow}>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Chemistry 401"
                    placeholderTextColor="#aaa"
                    value={newCourse}
                    onChangeText={setNewCourse}
                    onSubmitEditing={handleAddCourse}
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Course list */}
            <Text style={styles.sectionLabel}>SELECT COURSE</Text>
            <View style={styles.courseList}>
                {courses.map((course) => (
                    <TouchableOpacity
                        key={course}
                        style={[styles.courseRow, selectedCourse === course && styles.courseRowActive]}
                        onPress={() => { setSelectedCourse(course); setIsRunning(false); }}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.courseRowText, selectedCourse === course && styles.courseRowTextActive]}>
                            {course}
                        </Text>
                        <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={() => handleRemoveCourse(course)}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Text style={[styles.removeBtnText, selectedCourse === course && styles.removeBtnTextActive]}>✕</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
                {courses.length === 0 && (
                    <Text style={styles.emptyText}>No courses yet. Add one above.</Text>
                )}
            </View>

            {/* Active course */}
            {selectedCourse ? (
                <>
                    <View style={styles.activeCourseRow}>
                        <Text style={styles.activeCourseLabel}>Generating for: </Text>
                        <Text style={styles.activeCourseName}>{selectedCourse}</Text>
                    </View>

                    {/* QR Code */}
                    <View style={styles.qrContainer}>
                        {isRunning ? (
                            <>
                                <QRCode
                                    value={qrValue}
                                    size={200}
                                    color="#3d1f5e"
                                    backgroundColor="#ffffff"
                                />
                                <Text style={styles.tokenText}>{token}</Text>
                                <Text style={styles.countdownText}>Refreshes in {countdown.toFixed(1)}s</Text>
                            </>
                        ) : (
                            <View style={styles.qrPlaceholder}>
                                <Text style={styles.qrPlaceholderText}>Press START{'\n'}to generate QR</Text>
                            </View>
                        )}
                    </View>

                    {/* Start / Stop */}
                    <TouchableOpacity
                        style={[styles.button, isRunning && styles.buttonStop]}
                        onPress={() => setIsRunning(prev => !prev)}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.buttonText}>{isRunning ? 'STOP' : 'START GENERATING'}</Text>
                    </TouchableOpacity>

                    {isRunning && (
                        <Text style={styles.hint}>Show this screen to students to scan for attendance</Text>
                    )}
                </>
            ) : null}
        </ScrollView>
    );
}

const PURPLE_DARK = '#3d1f5e';
const BG = '#f0f0f0';

const styles = StyleSheet.create({
    scroll: { flex: 1, backgroundColor: BG },
    container: { paddingHorizontal: 20, alignItems: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, alignSelf: 'flex-start' },
    backButton: { padding: 8, marginRight: 8 },
    backArrow: { fontSize: 28, color: PURPLE_DARK, fontWeight: '600' },
    logo: { width: 80, height: 50 },
    title: { fontSize: 18, fontWeight: '800', color: PURPLE_DARK, letterSpacing: 2, marginBottom: 20, alignSelf: 'flex-start' },
    sectionLabel: { fontSize: 10, fontWeight: '800', color: PURPLE_DARK, letterSpacing: 2, marginBottom: 8, alignSelf: 'flex-start' },

    addRow: { flexDirection: 'row', width: '100%', gap: 10, marginBottom: 20 },
    input: {
        flex: 1, height: 48, borderRadius: 24,
        borderWidth: 1.5, borderColor: '#ddd',
        backgroundColor: '#fff', paddingHorizontal: 20,
        fontSize: 14, color: '#333',
    },
    addButton: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: PURPLE_DARK, alignItems: 'center', justifyContent: 'center',
    },
    addButtonText: { color: '#fff', fontSize: 24, fontWeight: '700', lineHeight: 28 },

    courseList: { width: '100%', marginBottom: 20, gap: 8 },
    courseRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14,
        paddingHorizontal: 18, borderWidth: 1.5, borderColor: '#ddd',
    },
    courseRowActive: { backgroundColor: PURPLE_DARK, borderColor: PURPLE_DARK },
    courseRowText: { fontSize: 14, fontWeight: '700', color: PURPLE_DARK, flex: 1 },
    courseRowTextActive: { color: '#fff' },
    removeBtn: { padding: 4 },
    removeBtnText: { fontSize: 14, color: '#ccc', fontWeight: '700' },
    removeBtnTextActive: { color: '#c9a8e0' },
    emptyText: { fontSize: 13, color: '#aaa', textAlign: 'center', paddingVertical: 16 },

    activeCourseRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, alignSelf: 'flex-start' },
    activeCourseLabel: { fontSize: 13, color: '#888', fontWeight: '600' },
    activeCourseName: { fontSize: 13, color: PURPLE_DARK, fontWeight: '800' },

    qrContainer: {
        width: 240, height: 240, backgroundColor: '#fff', borderRadius: 20,
        alignItems: 'center', justifyContent: 'center',
        marginBottom: 20, padding: 12,
        borderWidth: 2, borderColor: '#e0d5eb',
    },
    qrPlaceholder: { alignItems: 'center' },
    qrPlaceholderText: { fontSize: 14, color: '#aaa', textAlign: 'center', fontWeight: '600', lineHeight: 22 },
    tokenText: { marginTop: 8, fontSize: 12, color: '#aaa', fontWeight: '700', letterSpacing: 2 },
    countdownText: { fontSize: 11, color: '#c9a8e0', fontWeight: '700', marginTop: 4 },

    button: {
        width: '100%', height: 52, backgroundColor: PURPLE_DARK,
        borderRadius: 26, alignItems: 'center', justifyContent: 'center',
        shadowColor: PURPLE_DARK, shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, shadowRadius: 8, elevation: 6, marginBottom: 16,
    },
    buttonStop: { backgroundColor: '#c0392b' },
    buttonText: { color: '#fff', fontSize: 14, fontWeight: '800', letterSpacing: 1.5 },
    hint: { fontSize: 13, color: '#888', textAlign: 'center', fontWeight: '500' },
});
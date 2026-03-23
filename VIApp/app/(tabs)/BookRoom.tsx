import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ROOMS = [
    { id: '1', name: 'Room A1', capacity: 4, floor: '1st Floor', features: ['Whiteboard', 'TV Screen'] },
    { id: '2', name: 'Room A2', capacity: 6, floor: '1st Floor', features: ['Whiteboard', 'Projector'] },
    { id: '3', name: 'Room B1', capacity: 8, floor: '2nd Floor', features: ['Whiteboard', 'TV Screen', 'Video Call'] },
    { id: '4', name: 'Room B2', capacity: 4, floor: '2nd Floor', features: ['Whiteboard'] },
    { id: '5', name: 'Room C1', capacity: 12, floor: '3rd Floor', features: ['Projector', 'Video Call', 'Whiteboard'] },
];

const TIME_SLOTS = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00',
];

const INITIAL_BOOKED: Record<string, string[]> = {
    '1': ['09:00', '10:00', '14:00'],
    '2': ['08:00', '11:00', '15:00', '16:00'],
    '3': ['10:00', '11:00', '12:00'],
    '4': ['13:00', '14:00'],
    '5': ['09:00', '17:00'],
};

const getDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        dates.push(d);
    }
    return dates;
};

export default function RoomScreen() {
    const insets = useSafeAreaInsets();
    const dates = getDates();
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [bookedMap, setBookedMap] = useState(INITIAL_BOOKED);

    const bookedSlots = bookedMap[selectedRoom.id] || [];

    const handleBook = () => {
        if (!selectedSlot) return;
        Alert.alert(
            'Confirm Booking',
            `Book ${selectedRoom.name} at ${selectedSlot} on ${dates[selectedDate].toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Book',
                    onPress: () => {
                        setBookedMap(prev => ({
                            ...prev,
                            [selectedRoom.id]: [...(prev[selectedRoom.id] || []), selectedSlot!],
                        }));
                        setSelectedSlot(null);
                        Alert.alert('Booked!', `${selectedRoom.name} reserved at ${selectedSlot}.`);
                    },
                },
            ]
        );
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
                <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/main')}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Image
                    source={require('../Photo/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.title}>ROOM AVAILABILITY</Text>

            {/* Date picker */}
            <Text style={styles.sectionLabel}>SELECT DATE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                {dates.map((date, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dateChip, selectedDate === index && styles.dateChipActive]}
                        onPress={() => { setSelectedDate(index); setSelectedSlot(null); }}
                    >
                        <Text style={[styles.dateDay, selectedDate === index && styles.dateTextActive]}>
                            {date.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase()}
                        </Text>
                        <Text style={[styles.dateNum, selectedDate === index && styles.dateTextActive]}>
                            {date.getDate()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Room picker */}
            <Text style={styles.sectionLabel}>SELECT ROOM</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roomScroll}>
                {ROOMS.map((room) => (
                    <TouchableOpacity
                        key={room.id}
                        style={[styles.roomCard, selectedRoom.id === room.id && styles.roomCardActive]}
                        onPress={() => { setSelectedRoom(room); setSelectedSlot(null); }}
                    >
                        <Text style={[styles.roomName, selectedRoom.id === room.id && styles.roomNameActive]}>
                            {room.name}
                        </Text>
                        <Text style={[styles.roomFloor, selectedRoom.id === room.id && styles.roomFloorActive]}>
                            {room.floor}
                        </Text>
                        <Text style={[styles.roomCapacity, selectedRoom.id === room.id && styles.roomCapacityActive]}>
                            {room.capacity} people
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Room details */}
            <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>{selectedRoom.name} — {selectedRoom.floor}</Text>
                <Text style={styles.detailsCapacity}>Capacity: {selectedRoom.capacity} people</Text>
                <View style={styles.featuresRow}>
                    {selectedRoom.features.map((f) => (
                        <View key={f} style={styles.featureTag}>
                            <Text style={styles.featureText}>{f}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Time slots */}
            <Text style={styles.sectionLabel}>SELECT TIME SLOT</Text>
            <View style={styles.slotsGrid}>
                {TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedSlot === slot;
                    return (
                        <TouchableOpacity
                            key={slot}
                            disabled={isBooked}
                            style={[
                                styles.slot,
                                isBooked && styles.slotBooked,
                                isSelected && styles.slotSelected,
                            ]}
                            onPress={() => setSelectedSlot(slot)}
                        >
                            <Text style={[
                                styles.slotText,
                                isBooked && styles.slotTextBooked,
                                isSelected && styles.slotTextSelected,
                            ]}>
                                {slot}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Legend */}
            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#ccc' }]} />
                    <Text style={styles.legendLabel}>Available</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#3d1f5e' }]} />
                    <Text style={styles.legendLabel}>Selected</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#e0d5eb' }]} />
                    <Text style={styles.legendLabel}>Booked</Text>
                </View>
            </View>

            {/* Book button */}
            <TouchableOpacity
                style={[styles.bookButton, !selectedSlot && styles.bookButtonDisabled]}
                onPress={handleBook}
                disabled={!selectedSlot}
                activeOpacity={0.85}
            >
                <Text style={styles.bookButtonText}>
                    {selectedSlot ? `BOOK ${selectedRoom.name} AT ${selectedSlot}` : 'SELECT A TIME SLOT'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const PURPLE_DARK = '#3d1f5e';
const BG = '#f0f0f0';

const styles = StyleSheet.create({
    scroll: { flex: 1, backgroundColor: BG },
    container: { paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    backButton: { padding: 8, marginRight: 8 },
    backArrow: { fontSize: 28, color: PURPLE_DARK, fontWeight: '600' },
    logo: { width: 80, height: 50 },
    title: { fontSize: 22, fontWeight: '800', color: PURPLE_DARK, letterSpacing: 2, marginBottom: 20 },
    sectionLabel: { fontSize: 11, fontWeight: '800', color: PURPLE_DARK, letterSpacing: 2, marginBottom: 10 },

    // Date
    dateScroll: { marginBottom: 24 },
    dateChip: {
        alignItems: 'center', justifyContent: 'center',
        width: 56, height: 68, borderRadius: 14,
        backgroundColor: '#fff', marginRight: 10,
        borderWidth: 1.5, borderColor: '#ddd',
    },
    dateChipActive: { backgroundColor: PURPLE_DARK, borderColor: PURPLE_DARK },
    dateDay: { fontSize: 11, fontWeight: '700', color: '#888', marginBottom: 4 },
    dateNum: { fontSize: 20, fontWeight: '800', color: PURPLE_DARK },
    dateTextActive: { color: '#fff' },

    // Room cards
    roomScroll: { marginBottom: 16 },
    roomCard: {
        width: 110, padding: 12, borderRadius: 14, marginRight: 10,
        backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#ddd',
    },
    roomCardActive: { backgroundColor: PURPLE_DARK, borderColor: PURPLE_DARK },
    roomName: { fontSize: 14, fontWeight: '800', color: PURPLE_DARK, marginBottom: 2 },
    roomNameActive: { color: '#fff' },
    roomFloor: { fontSize: 11, color: '#888', marginBottom: 4 },
    roomFloorActive: { color: '#c9a8e0' },
    roomCapacity: { fontSize: 11, fontWeight: '700', color: '#aaa' },
    roomCapacityActive: { color: '#c9a8e0' },

    // Details
    detailsCard: {
        backgroundColor: '#fff', borderRadius: 14,
        padding: 14, marginBottom: 24,
    },
    detailsTitle: { fontSize: 15, fontWeight: '800', color: PURPLE_DARK, marginBottom: 4 },
    detailsCapacity: { fontSize: 13, color: '#888', marginBottom: 10 },
    featuresRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    featureTag: {
        backgroundColor: '#f0eaf6', paddingHorizontal: 10,
        paddingVertical: 4, borderRadius: 8,
    },
    featureText: { fontSize: 12, fontWeight: '700', color: PURPLE_DARK },

    // Slots
    slotsGrid: {
        flexDirection: 'row', flexWrap: 'wrap',
        gap: 10, marginBottom: 16,
    },
    slot: {
        width: '28%', paddingVertical: 12, borderRadius: 12,
        alignItems: 'center', backgroundColor: '#fff',
        borderWidth: 1.5, borderColor: '#ddd',
    },
    slotBooked: { backgroundColor: '#e0d5eb', borderColor: '#e0d5eb' },
    slotSelected: { backgroundColor: PURPLE_DARK, borderColor: PURPLE_DARK },
    slotText: { fontSize: 13, fontWeight: '700', color: PURPLE_DARK },
    slotTextBooked: { color: '#b09fc0' },
    slotTextSelected: { color: '#fff' },

    // Legend
    legend: { flexDirection: 'row', gap: 16, marginBottom: 24 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 14, height: 14, borderRadius: 7 },
    legendLabel: { fontSize: 12, color: '#888', fontWeight: '600' },

    // Book button
    bookButton: {
        backgroundColor: PURPLE_DARK, borderRadius: 25,
        paddingVertical: 16, alignItems: 'center',
        shadowColor: PURPLE_DARK, shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
    },
    bookButtonDisabled: { backgroundColor: '#c9a8e0', shadowOpacity: 0 },
    bookButtonText: { color: '#fff', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
});
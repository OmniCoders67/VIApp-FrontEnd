import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from "expo-router";
import { useAuth } from '../../context/AuthContext';

const menuItems = [
    {
        id: 'checkin',
        label: 'CHECK-IN\nATTENDANCE',
        icon: '👥',
        route: '/(tabs)/qrscanner',
        adminOnly: false,
        fullWidth: false,
    },
    {
        id: 'announcements',
        label: 'ANNOUNCEMENTS\n& EVENTS',
        icon: '📣',
        route: '/(tabs)/Announcement',
        adminOnly: false,
        fullWidth: false,
    },
    {
        id: 'menu',
        label: "TODAY'S MENU",
        icon: '🍽️',
        route: '/(tabs)/Menu',
        adminOnly: false,
        fullWidth: false,
    },
    {
        id: 'forum',
        label: 'FORUM',
        icon: '💬',
        route: '/(tabs)/Forum',
        adminOnly: false,
        fullWidth: false,
    },
    {
        id: 'room',
        label: 'ROOM\nAVAILABILITY',
        icon: '🚪',
        fullWidth: true,
        route: '/(tabs)/BookRoom',
        adminOnly: false,
    },
    {
        id: 'QR',
        label: 'CREATE\nQR CODE',
        icon: '🔑',
        fullWidth: true,
        route: '/(tabs)/QR_Admin',
        adminOnly: true, // ← only admins see this
    },
];

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const { name, role } = useAuth();

    console.log("HomeScreen - name:", name, "role:", role);

    const visibleItems = menuItems.filter(item => !item.adminOnly || role === 'Admin');

    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
                styles.container,
                { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
            ]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require('../Photo/logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.welcome}>WELCOME, {name ?? 'USER'}!</Text>

            <View style={styles.grid}>
                {/* Grid cards — non full width */}
                {visibleItems
                    .filter(item => !item.fullWidth)
                    .reduce<(typeof menuItems[0])[][]>((rows, item, i) => {
                        if (i % 2 === 0) rows.push([item]);
                        else rows[rows.length - 1].push(item);
                        return rows;
                    }, [])
                    .map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.card}
                                    activeOpacity={0.85}
                                    onPress={() => item.route ? router.push(item.route as any) : null}
                                >
                                    <Text style={styles.cardIcon}>{item.icon}</Text>
                                    <Text style={styles.cardLabel}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}

                {/* Full width cards */}
                {visibleItems
                    .filter(item => item.fullWidth)
                    .map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.card, styles.cardFullWidth]}
                            activeOpacity={0.85}
                            onPress={() => item.route ? router.push(item.route as any) : null}
                        >
                            <Text style={styles.cardIcon}>{item.icon}</Text>
                            <Text style={styles.cardLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
            </View>
        </ScrollView>
    );
}

const PURPLE = '#c9a8e0';
const PURPLE_DARK = '#3d1f5e';
const BG = '#f0f0f0';

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: BG,
    },
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    logoImage: {
        width: 120,
        height: 80,
    },
    welcome: {
        fontSize: 20,
        fontWeight: '800',
        color: PURPLE_DARK,
        letterSpacing: 1,
        marginBottom: 28,
    },
    grid: {
        width: '100%',
        gap: 14,
    },
    row: {
        flexDirection: 'row',
        gap: 14,
    },
    card: {
        flex: 1,
        backgroundColor: PURPLE,
        borderRadius: 20,
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        minHeight: 130,
        gap: 8,
    },
    cardFullWidth: {
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 110,
        gap: 20,
        paddingHorizontal: 28,
    },
    cardIcon: {
        fontSize: 36,
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: PURPLE_DARK,
        letterSpacing: 0.5,
        lineHeight: 17,
    },
});
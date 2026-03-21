import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const menuItems = [
    {
        id: 'checkin',
        label: 'CHECK-IN\nATTENDANCE',
        icon: '👥',
    },
    {
        id: 'announcements',
        label: 'ANNOUNCEMENTS\n& EVENTS',
        icon: '📣',
    },
    {
        id: 'menu',
        label: "TODAY'S MENU",
        icon: '🍽️',
    },
    {
        id: 'forum',
        label: 'FORUM',
        icon: '💬',
    },
    {
        id: 'room',
        label: 'ROOM\nAVAILABILITY',
        icon: '🚪',
        fullWidth: true,
    },
];

export default function HomeScreen() {
    const insets = useSafeAreaInsets();

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
                <Image source={require('../Photo/logo.png')} style={styles.logoImage} resizeMode="contain" />
            </View>

            {/* Welcome */}
            <Text style={styles.welcome}>WELCOME, NAME!</Text>

            {/* Grid */}
            <View style={styles.grid}>
                {menuItems
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
                                >
                                    <Text style={styles.cardIcon}>{item.icon}</Text>
                                    <Text style={styles.cardLabel}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}

                {/* Full width last card */}
                {menuItems
                    .filter(item => item.fullWidth)
                    .map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.card, styles.cardFullWidth]}
                            activeOpacity={0.85}
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

    // Logo
    logoContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    logoImage: {
        width: 120,
        height: 80,
    },
    logoText: {
        fontSize: 28,
        fontWeight: '800',
        color: PURPLE_DARK,
        letterSpacing: 4,
    },

    // Welcome
    welcome: {
        fontSize: 20,
        fontWeight: '800',
        color: PURPLE_DARK,
        letterSpacing: 1,
        marginBottom: 28,
    },

    // Grid
    grid: {
        width: '100%',
        gap: 14,
    },
    row: {
        flexDirection: 'row',
        gap: 14,
    },

    // Cards
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
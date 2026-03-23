import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const menuData = [
    {
        category: 'MAINS',
        items: [
            { name: 'Grilled Salmon', description: 'With lemon butter and vegetables',  tags: ['GF'] },
            { name: 'Pasta Bolognese', description: 'Slow-cooked beef ragu', tags: [] },
            { name: 'Mushroom Risotto', description: 'Arborio rice, wild mushrooms',  tags: ['V', 'GF'] },
            { name: 'Chicken Burger', description: 'Brioche bun, lettuce, tomato',  tags: [] },
        ],
    },
    {
        category: 'DESSERTS',
        items: [
            { name: 'Chocolate Brownie', description: 'Warm, with vanilla ice cream',  tags: ['V'] },
            { name: 'Fresh Fruit Salad', description: 'Seasonal fruits with mint',  tags: ['V', 'GF'] },
        ],
    },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
    V: { bg: '#e6f3de', text: '#3b6d11' },
    GF: { bg: '#faeeda', text: '#854f0b' },
};

export default function MenuScreen() {
    const insets = useSafeAreaInsets();

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

            <Text style={styles.title}>TODAY'S MENU</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>

            {/* Legend */}
            <View style={styles.legend}>
                <View style={[styles.tag, { backgroundColor: TAG_COLORS.V.bg }]}>
                    <Text style={[styles.tagText, { color: TAG_COLORS.V.text }]}>V Vegetarian</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: TAG_COLORS.GF.bg }]}>
                    <Text style={[styles.tagText, { color: TAG_COLORS.GF.text }]}>GF Gluten Free</Text>
                </View>
            </View>

            {/* Menu sections */}
            {menuData.map((section) => (
                <View key={section.category} style={styles.section}>
                    <Text style={styles.categoryTitle}>{section.category}</Text>
                    <View style={styles.card}>
                        {section.items.map((item, index) => (
                            <View
                                key={item.name}
                                style={[
                                    styles.menuItem,
                                    index < section.items.length - 1 && styles.menuItemBorder,
                                ]}
                            >
                                <View style={styles.menuItemLeft}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDescription}>{item.description}</Text>
                                    <View style={styles.tagRow}>
                                        {item.tags.map((tag) => (
                                            <View
                                                key={tag}
                                                style={[styles.tag, { backgroundColor: TAG_COLORS[tag].bg }]}
                                            >
                                                <Text style={[styles.tagText, { color: TAG_COLORS[tag].text }]}>{tag}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const PURPLE_DARK = '#3d1f5e';
const BG = '#f0f0f0';

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: BG,
    },
    container: {
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    backArrow: {
        fontSize: 28,
        color: PURPLE_DARK,
        fontWeight: '600',
    },
    logo: {
        width: 80,
        height: 50,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: PURPLE_DARK,
        letterSpacing: 2,
        marginBottom: 4,
    },
    date: {
        fontSize: 13,
        color: '#888',
        marginBottom: 16,
        fontWeight: '500',
    },
    legend: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    categoryTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: PURPLE_DARK,
        letterSpacing: 2,
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuItemLeft: {
        flex: 1,
        marginRight: 12,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    itemDescription: {
        fontSize: 12,
        color: '#888',
        marginBottom: 6,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 6,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 11,
        fontWeight: '700',
    },
    calories: {
        fontSize: 12,
        color: '#aaa',
        fontWeight: '600',
    },
});
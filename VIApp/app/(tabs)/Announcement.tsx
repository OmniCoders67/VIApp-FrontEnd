import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Announcement = () => {
    return (
        <View style={styles.announcement}>
            <Text style={styles.title}>
                Announcements{"\n"}&{"\n"}Events
            </Text>

            <View style={[styles.card, styles.importantCard]}>
                <Text style={styles.cardTitle}>Important</Text>
            </View>

            <View style={[styles.card, styles.middleCard]}>
                <Text style={styles.cardTitle}>Upcoming Event</Text>
            </View>

            <View style={[styles.card, styles.bottomCard]}>
                <Text style={styles.cardTitle}>Announcement</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    announcement: {
        width: "100%",
        height: 852,
        backgroundColor: "#f3f3f3",
        overflow: "hidden",
        alignItems: "center"
    },
    title: {
        marginTop: 82,
        fontSize: 32,
        color: "#000",
        textAlign: "center",
        fontFamily: "System",
        textTransform: "uppercase",
        lineHeight: 36
    },
    card: {
        width: 292,
        height: 148,
        borderRadius: 13,
        position: "absolute",
        left: 53,
        justifyContent: "center",
        alignItems: "center"
    },
    importantCard: {
        top: 185,
        backgroundColor: "#e07a7a"
    },
    middleCard: {
        top: 351,
        backgroundColor: "#d5b3df"
    },
    bottomCard: {
        top: 518,
        backgroundColor: "#d5b3df"
    },
    cardTitle: {
        fontSize: 24,
        color: "#43254a",
        fontFamily: "System",
        textTransform: "uppercase",
        textAlign: "center"
    }
});

export default Announcement;
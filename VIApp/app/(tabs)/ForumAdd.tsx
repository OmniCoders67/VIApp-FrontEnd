import * as React from "react";
import {Text, StyleSheet, View} from "react-native";

const ForumAdd = () => {

    return (
        <View style={styles.forumadd}>
            <Text style={[styles.startADiscussion, styles.whatIsThisTypo]}>Start a discussion</Text>
            <Text style={[styles.whatIsThis, styles.whatIsThisTypo]}>What is this Discussion about?</Text>
            <View style={styles.forumaddChild} />
            <Text style={[styles.writeSomethingHere, styles.whatIsThisTypo]}>Write something here</Text>
            <Text style={[styles.topic, styles.topicTypo]}>Topic</Text>
            <View style={[styles.forumaddItem, styles.forumaddBorder]} />
            <Text style={[styles.anonymous, styles.topicTypo]}>Anonymous?</Text>
            <Text style={[styles.startDiscussion, styles.topicTypo]}>Start discussion:</Text>
            <View style={[styles.forumaddInner, styles.forumaddBorder]} />
        </View>);
};

const styles = StyleSheet.create({
    whatIsThisTypo: {
        textAlign: "center",
        color: "#000",
        fontFamily: "Coolvetica",
        textTransform: "uppercase",
        lineHeight: 24,
        position: "absolute"
    },
    topicTypo: {
        height: 24,
        left: "50%",
        textAlign: "center",
        color: "#000",
        fontFamily: "Coolvetica",
        textTransform: "uppercase",
        lineHeight: 24,
        position: "absolute"
    },
    forumaddBorder: {
        height: 45,
        backgroundColor: "rgba(217, 217, 217, 0)",
        borderRadius: 16,
        left: "50%",
        borderWidth: 3,
        borderColor: "#43254a",
        borderStyle: "solid",
        position: "absolute"
    },
    forumadd: {
        width: "100%",
        height: 852,
        overflow: "hidden",
        backgroundColor: "#f3f3f3"
    },
    startADiscussion: {
        top: 88,
        left: 53,
        fontSize: 32
    },
    whatIsThis: {
        top: 174,
        left: 49,
        fontSize: 20
    },
    forumaddChild: {
        top: 450,
        left: 63,
        borderRadius: 13,
        width: 292,
        height: 148,
        borderWidth: 3,
        borderColor: "#43254a",
        borderStyle: "solid",
        position: "absolute",
        backgroundColor: "#f3f3f3"
    },
    writeSomethingHere: {
        top: 512,
        left: 104,
        fontSize: 20
    },
    topic: {
        marginLeft: -134,
        top: 226,
        fontSize: 15,
        width: 44
    },
    forumaddItem: {
        marginLeft: -142,
        top: 216,
        width: 285
    },
    anonymous: {
        marginLeft: -148,
        top: 301,
        width: 125,
        fontSize: 20
    },
    startDiscussion: {
        marginLeft: -147,
        top: 414,
        width: 182,
        fontSize: 20
    },
    forumaddInner: {
        marginLeft: -10,
        top: 291,
        width: 45
    }
});

export default ForumAdd;

import * as React from "react";
import {Image, StyleSheet, View, Text} from "react-native";

const Forum = () => {

    return (
        <View style={styles.forum}>
            <Image
                style={styles.logoshort1Icon}
                resizeMode="contain"
                source={require("../Photo/logo.png")}
            />
            <View style={[styles.rectangleParent, styles.groupParentLayout]}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
                <Text style={[styles.titleOfThe, styles.textTypo]}>Title of the forum</Text>
                <Text style={[styles.text, styles.textTypo]}>+/-999</Text>
                <Image
                    style={styles.image9Icon}
                    resizeMode="contain"
                    source={require("../Photo/arrow.png")}
                />
            </View>
            <View style={[styles.rectangleGroup, styles.groupParentLayout]}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
                <Text style={[styles.titleOfThe, styles.textTypo]}>Title of the forum</Text>
                <Text style={[styles.text, styles.textTypo]}>+/-999</Text>
                <Image
                    style={styles.image9Icon}
                    resizeMode="contain"
                    source={require("../Photo/arrow.png")}
                />
            </View>
            <View style={[styles.rectangleContainer, styles.groupParentLayout]}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
                <Text style={[styles.titleOfThe, styles.textTypo]}>Title of the forum</Text>
                <Text style={[styles.text, styles.textTypo]}>+/-999</Text>
                <Image
                    style={styles.image9Icon}
                    resizeMode="contain"
                    source={require("../Photo/arrow.png")}
                />
            </View>
            <View style={[styles.groupView, styles.groupParentLayout]}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
                <Text style={[styles.titleOfThe, styles.textTypo]}>Title of the forum</Text>
                <Text style={[styles.text, styles.textTypo]}>+/-999</Text>
                <Image style={styles.image9Icon} resizeMode="cover" />
            </View>
            <View style={[styles.rectangleParent2, styles.groupParentLayout]}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
                <Text style={[styles.titleOfThe, styles.textTypo]}>Title of the forum</Text>
                <Text style={[styles.text, styles.textTypo]}>+/-999</Text>
                <Image
                    style={styles.image9Icon}
                    resizeMode="contain"
                    source={require("../Photo/arrow.png")}
                />
            </View>
            <View style={[styles.rectangleParent3, styles.groupParentLayout]}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
                <Text style={[styles.titleOfThe, styles.textTypo]}>Title of the forum</Text>
                <Text style={[styles.text, styles.textTypo]}>+/-999</Text>
                <Image
                    style={styles.image9Icon}
                    resizeMode="contain"
                    source={require("../Photo/arrow.png")}
                />
            </View>
            <View style={[styles.rectangleParent4, styles.groupParentLayout]}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
                <Text style={[styles.titleOfThe, styles.textTypo]}>Title of the forum</Text>
                <Text style={[styles.text, styles.textTypo]}>+/-999</Text>
                <Image
                    style={styles.image9Icon}
                    resizeMode="contain"
                    source={require("../Photo/arrow.png")}
                />
            </View>
            <View style={[styles.rectangleParent5, styles.groupParentLayout]}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
                <Text style={[styles.titleOfThe, styles.textTypo]}>Title of the forum</Text>
                <Text style={[styles.text, styles.textTypo]}>+/-999</Text>
                <Image
                    style={styles.image9Icon}
                    resizeMode="contain"
                    source={require("../Photo/arrow.png")}
                />
            </View>
            <View style={[styles.rectangleParent6, styles.groupParentLayout]}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
                <Text style={[styles.titleOfThe, styles.textTypo]}>Title of the forum</Text>
                <Text style={[styles.text, styles.textTypo]}>+/-999</Text>
                <Image
                    style={styles.image9Icon}
                    resizeMode="contain"
                    source={require("../Photo/arrow.png")}
                />
            </View>
            <Text style={styles.forum2}>FORum</Text>
            <View style={[styles.rectangleParent7, styles.groupChild7Layout]}>
                <View style={[styles.groupChild7, styles.groupChild7Layout]} />
                <Text style={styles.addANew}>Add a new topic</Text>
            </View>
        </View>);
};

const styles = StyleSheet.create({
    groupParentLayout: {
        height: 50,
        width: 363,
        position: "absolute"
    },
    groupChildPosition: {
        borderRadius: 12,
        left: 0,
        top: 0
    },
    textTypo: {
        height: 13,
        fontSize: 12,
        textAlign: "left",
        color: "#000",
        fontFamily: "Coolvetica",
        textTransform: "uppercase",
        lineHeight: 10,
        top: 19,
        position: "absolute"
    },
    groupChild7Layout: {
        width: 223,
        height: 50,
        position: "absolute"
    },
    forum: {
        width: "100%",
        height: 852,
        backgroundColor: "#f3f3f3",
        overflow: "hidden"
    },
    logoshort1Icon: {
        marginLeft: -37,
        top: 65,
        width: 76,
        height: 76,
        left: "50%",
        position: "absolute"
    },
    rectangleParent: {
        top: 192,
        left: 16,
        width: 363
    },
    groupChild: {
        backgroundColor: "#d5b3df",
        height: 50,
        width: 363,
        position: "absolute"
    },
    titleOfThe: {
        position: "absolute",
        left: 9,
        right: 80,
        top: 19,
        fontSize: 12,
        color: "#000",
        fontFamily: "System",
        textTransform: "uppercase"
    },
    text: {
        position: "absolute",
        right: 50,
        top: 19,
        fontSize: 12,
        color: "#000",
        fontFamily: "System"
    },
    image9Icon: {
        position: "absolute",
        right: 10,
        top: 12,
        width: 25,
        height: 26
    },
    rectangleGroup: {
        top: 257,
        left: 16,
        width: 363
    },
    rectangleContainer: {
        top: 322,
        left: 16,
        width: 363
    },
    groupView: {
        top: 387,
        left: 16,
        width: 363
    },
    rectangleParent2: {
        top: 452,
        left: 16,
        width: 363
    },
    rectangleParent3: {
        top: 517,
        left: 16,
        width: 363
    },
    rectangleParent4: {
        top: 582,
        left: 16,
        width: 363
    },
    rectangleParent5: {
        top: 647,
        left: 16,
        width: 363
    },
    rectangleParent6: {
        top: 712,
        left: 16,
        width: 363
    },
    forum2: {
        marginLeft: -29,
        top: 164,
        fontSize: 20,
        lineHeight: 24,
        textAlign: "center",
        color: "#000",
        fontFamily: "Coolvetica",
        textTransform: "uppercase",
        left: "50%",
        position: "absolute"
    },
    rectangleParent7: {
        top: 769,
        left: 85
    },
    groupChild7: {
        backgroundColor: "#43254a",
        borderRadius: 12,
        left: 0,
        top: 0
    },
    addANew: {
        left: 11,
        fontSize: 25,
        color: "#fff",
        width: 199,
        height: 18,
        textAlign: "left",
        lineHeight: 10,
        top: 19,
        fontFamily: "Coolvetica",
        textTransform: "uppercase",
        position: "absolute"
    }
});

export default Forum;

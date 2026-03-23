import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { ForumPost } from "@/api/forum";

interface Props {
    post: ForumPost;
}

const CollapsedForum = ({ post }: Props) => {
    const [likes, setLikes] = useState(() => Math.floor(Math.random() * 101));
    const [expanded, setExpanded] = useState(false);

    return (
        <TouchableOpacity
            style={[styles.rectangleParent, expanded && styles.rectangleParentExpanded]}
            onPress={() => setExpanded(prev => !prev)}
            activeOpacity={0.9}
        >
            <View style={[styles.groupChild, expanded && styles.groupChildExpanded]} />

            <Text style={styles.titleOfThe}>{post.title}</Text>

            {expanded && (
                <Text style={styles.description}>{post.description}</Text>
            )}

            <View style={styles.voteContainer}>
                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        setLikes(prev => prev - 1);
                    }}
                >
                    <Image
                        style={[styles.arrowIcon, styles.leftArrow]}
                        resizeMode="contain"
                        source={require("../../app/Photo/arrow.png")}
                    />
                </TouchableOpacity>

                <Text style={styles.votes}>{likes}</Text>

                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        setLikes(prev => prev + 1);
                    }}
                >
                    <Image
                        style={styles.arrowIcon}
                        resizeMode="contain"
                        source={require("../../app/Photo/arrow.png")}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

export default CollapsedForum;

const styles = StyleSheet.create({
    rectangleParent: {
        width: 363,
        height: 50,
        marginBottom: 10,
    },
    rectangleParentExpanded: {
        height: 'auto',
        minHeight: 50,
    },
    groupChild: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#d5b3df",
        borderRadius: 12,
        height: 50,
    },
    groupChildExpanded: {
        height: '100%',
        minHeight: 50,
    },
    titleOfThe: {
        fontSize: 12,
        textAlign: "left",
        color: "#000",
        fontFamily: "System",
        textTransform: "uppercase",
        position: "absolute",
        top: 18,
        left: 9,
        right: 120,
    },
    description: {
        fontSize: 12,
        color: "#000",
        fontFamily: "System",
        marginTop: 55,
        marginBottom: 16,
        marginLeft: 9,
        marginRight: 9,
    },
    voteContainer: {
        position: "absolute",
        right: 10,
        top: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    leftArrow: {
        transform: [{ rotate: "180deg" }],
        marginRight: 6,
    },
    votes: {
        fontSize: 12,
        color: "#000",
        fontFamily: "System",
        marginRight: 6,
        minWidth: 30,
        textAlign: "center",
    },
});
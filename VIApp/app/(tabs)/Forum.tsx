import * as React from "react";
import { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import CollapsedForum from "@/components/ui/collapsed-forum";
import { router } from "expo-router";
import { getForumPosts, ForumPost } from "@/api/forum";

const Forum = () => {
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await getForumPosts();
                setPosts(data);
            } catch (e) {
                console.log("Forum error:", e instanceof Error ? e.message : JSON.stringify(e));
                Alert.alert("Error", e instanceof Error ? e.message : "Failed to load forum posts.");
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    return (
        <View style={styles.forum}>
            {/* Back Arrow */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push("/(tabs)/main")}
            >
                <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            {/* Logo */}
            <Image
                style={styles.logo}
                resizeMode="contain"
                source={require("../Photo/logo.png")}
            />

            {/* Title */}
            <Text style={styles.title}>FORUM</Text>

            {/* Posts list */}
            {loading ? (
                <ActivityIndicator
                    style={styles.loader}
                    size="large"
                    color="#43254a"
                />
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {posts.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No discussions yet. Be the first!
                        </Text>
                    ) : (
                        posts.map((post) => (
                            <CollapsedForum key={post.id} post={post} />
                        ))
                    )}

                    {/* Add discussion button */}
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => router.push("/(tabs)/ForumAdd")}
                    >
                        <Text style={styles.addButtonText}>+ ADD NEW DISCUSSION</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    forum: {
        flex: 1,
        backgroundColor: "#f3f3f3",
    },
    backButton: {
        position: "absolute",
        top: 60,
        left: 20,
        zIndex: 10,
        padding: 8,
    },
    backArrow: {
        fontSize: 28,
        color: "#43254a",
        fontWeight: "600",
    },
    logo: {
        alignSelf: "center",
        marginTop: 65,
        width: 76,
        height: 76,
    },
    title: {
        fontSize: 20,
        lineHeight: 24,
        textAlign: "center",
        color: "#000",
        fontFamily: "System",
        textTransform: "uppercase",
        marginTop: 8,
        marginBottom: 16,
    },
    loader: {
        marginTop: 80,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        gap: 10,
    },
    emptyText: {
        textAlign: "center",
        color: "#777",
        fontFamily: "System",
        fontSize: 14,
        marginTop: 40,
        textTransform: "uppercase",
    },
    addButton: {
        backgroundColor: "#43254a",
        borderRadius: 16,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 16,
        letterSpacing: 1,
    },
});

export default Forum;
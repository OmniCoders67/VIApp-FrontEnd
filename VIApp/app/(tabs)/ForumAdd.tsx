import React, { useRef, useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Switch,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { createForumPost } from "@/api/forum";

const ForumAdd = () => {
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const contentInputRef = useRef<TextInput>(null);

    const handleStartDiscussion = async () => {
        Keyboard.dismiss();

        if (!topic.trim() || !content.trim()) {
            Alert.alert("Error", "Please fill in topic and discussion text.");
            return;
        }

        try {
            setLoading(true);
            console.log("Sending token:", token);
            console.log("Sending post:", { title: topic, description: content, isAnonymous: anonymous }); // ← add this
            await createForumPost(
                { title: topic, description: content, isAnonymous: anonymous },
                token!
            );
            Alert.alert("Success", "Discussion created successfully.");
            setTopic("");
            setContent("");
            setAnonymous(false);
            router.push("/(tabs)/Forum");
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert("Error", error.message);
            } else {
                Alert.alert("Error", "Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.push("/(tabs)/Forum")}
                        >
                            <Text style={styles.backArrow}>←</Text>
                        </TouchableOpacity>
                        <Image
                            source={require("../Photo/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.title}>START A{"\n"}DISCUSSION</Text>

                        {/* Topic input */}
                        <View style={styles.inputGroup}>
                            <TextInput
                                style={styles.input}
                                value={topic}
                                onChangeText={setTopic}
                                placeholder="TOPIC"
                                placeholderTextColor="#43254a"
                                returnKeyType="next"
                                onSubmitEditing={() => contentInputRef.current?.focus()}
                                blurOnSubmit={false}
                            />
                        </View>

                        {/* Content input */}
                        <View style={styles.inputGroup}>
                            <TextInput
                                ref={contentInputRef}
                                style={[styles.input, styles.contentInput]}
                                value={content}
                                onChangeText={setContent}
                                placeholder="WRITE SOMETHING HERE"
                                placeholderTextColor="#43254a"
                                multiline
                                textAlignVertical="top"
                            />
                        </View>

                        {/* Anonymous toggle */}
                        <View style={styles.switchRow}>
                            <Text style={styles.switchLabel}>ANONYMOUS?</Text>
                            <Switch
                                value={anonymous}
                                onValueChange={setAnonymous}
                                trackColor={{ false: "#ccc", true: "#b38bc6" }}
                                thumbColor={anonymous ? "#43254a" : "#f4f3f4"}
                            />
                        </View>

                        {/* Submit button */}
                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleStartDiscussion}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? "POSTING..." : "ADD DISCUSSION"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 60,
        paddingHorizontal: 24,
        marginBottom: 8,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    backArrow: {
        fontSize: 28,
        color: "#43254a",
        fontWeight: "600",
    },
    logo: {
        width: 100,
        height: 50,
    },
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 16,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#43254a",
        letterSpacing: 1,
        textAlign: "center",
        marginBottom: 36,
        lineHeight: 34,
    },
    inputGroup: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 2,
        borderColor: "#43254a",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 13,
        fontWeight: "700",
        color: "#43254a",
        backgroundColor: "#f0f0f0",
        letterSpacing: 0.5,
    },
    contentInput: {
        minHeight: 160,
        paddingTop: 14,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32,
        marginTop: 8,
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: "800",
        color: "#43254a",
        letterSpacing: 0.5,
    },
    button: {
        backgroundColor: "#43254a",
        borderRadius: 12,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 16,
        letterSpacing: 1,
    },
});

export default ForumAdd;
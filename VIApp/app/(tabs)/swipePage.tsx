import React, { useMemo, useRef, useState } from "react";
import {
    Animated,
    Alert,
    Dimensions,
    PanResponder,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const TRACK_WIDTH = Math.min(width - 48, 360);
const TRACK_HEIGHT = 92;
const KNOB_SIZE = 72;
const HORIZONTAL_PADDING = 10;
const LEFT_POSITION = 0;
const RIGHT_POSITION = TRACK_WIDTH - KNOB_SIZE - HORIZONTAL_PADDING * 2;

const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function SwipePage() {
    const { courseName } = useLocalSearchParams<{ courseName?: string }>();
    const displayedCourseName = courseName || "Course Name";

    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const translateX = useRef(new Animated.Value(LEFT_POSITION)).current;
    const currentOffset = useRef(LEFT_POSITION);

    const animateTo = (value: number) => {
        currentOffset.current = value;
        Animated.spring(translateX, {
            toValue: value,
            useNativeDriver: true,
            bounciness: 6,
        }).start();
    };

    const handleCheckIn = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const now = new Date();
            const timeString = formatTime(now);
            // TODO: backend request for check-in
            setIsCheckedIn(true);
            setCheckInTime(timeString);
            setCheckOutTime(null);
            animateTo(RIGHT_POSITION);
        } catch (error) {
            Alert.alert("Error", "Failed to check in.");
            animateTo(LEFT_POSITION);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckOut = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const now = new Date();
            const timeString = formatTime(now);
            // TODO: backend request for check-out
            setIsCheckedIn(false);
            setCheckOutTime(timeString);
            animateTo(LEFT_POSITION);
            Alert.alert("Signed out", `You left ${displayedCourseName} at ${timeString}`);
        } catch (error) {
            Alert.alert("Error", "Failed to check out.");
            animateTo(RIGHT_POSITION);
        } finally {
            setIsLoading(false);
        }
    };

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => !isLoading,
                onMoveShouldSetPanResponder: (_, gestureState) =>
                    !isLoading && Math.abs(gestureState.dx) > 5,
                onPanResponderGrant: () => {
                    translateX.stopAnimation((value: number) => {
                        currentOffset.current = value;
                    });
                },
                onPanResponderMove: (_, gestureState) => {
                    let nextValue = currentOffset.current + gestureState.dx;
                    if (nextValue < LEFT_POSITION) nextValue = LEFT_POSITION;
                    if (nextValue > RIGHT_POSITION) nextValue = RIGHT_POSITION;
                    translateX.setValue(nextValue);
                },
                onPanResponderRelease: (_, gestureState) => {
                    const finalValue = Math.max(
                        LEFT_POSITION,
                        Math.min(RIGHT_POSITION, currentOffset.current + gestureState.dx)
                    );
                    currentOffset.current = finalValue;
                    if (!isCheckedIn) {
                        const shouldCheckIn =
                            finalValue > RIGHT_POSITION * 0.75 || gestureState.vx > 0.8;
                        if (shouldCheckIn) {
                            handleCheckIn();
                        } else {
                            animateTo(LEFT_POSITION);
                        }
                    } else {
                        const shouldCheckOut =
                            finalValue < RIGHT_POSITION * 0.25 || gestureState.vx < -0.8;
                        if (shouldCheckOut) {
                            handleCheckOut();
                        } else {
                            animateTo(RIGHT_POSITION);
                        }
                    }
                },
                onPanResponderTerminate: () => {
                    animateTo(isCheckedIn ? RIGHT_POSITION : LEFT_POSITION);
                },
            }),
        [isCheckedIn, isLoading]
    );

    const statusText = isCheckedIn
        ? `Signed in at ${checkInTime ?? "--:--"}`
        : checkOutTime
            ? `Signed out at ${checkOutTime}`
            : "Not signed in";

    const swipeLabel = isCheckedIn ? "Swipe left to sign out" : "Swipe right to sign in";

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>To sign to:</Text>

            <Text style={styles.courseName}>{displayedCourseName}</Text>

            <Text style={styles.status}>{statusText}</Text>

            <Text style={styles.swipeLabel}>{swipeLabel}</Text>

            <View style={styles.swipeWrapper}>
                <View style={styles.track}>
                    <Text style={styles.trackHint}>
                        {isCheckedIn ? "Slide back to leave" : "Slide to sign"}
                    </Text>
                    <Animated.View
                        {...panResponder.panHandlers}
                        style={[styles.knob, { transform: [{ translateX }] }]}
                    >
                        <Text style={styles.knobArrow}>{isCheckedIn ? "‹" : "›"}</Text>
                    </Animated.View>
                </View>
            </View>

            <Text style={styles.backText} onPress={() => router.push('/(tabs)/main')}>
                Back
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bfb4d4",
        alignItems: "center",
        paddingTop: 110,
        paddingHorizontal: 24,
    },
    heading: {
        fontSize: 34,
        fontFamily: "System",
        fontWeight: "700",
        color: "#000",
        marginBottom: 44,
    },
    courseName: {
        fontSize: 30,
        fontFamily: "System",
        color: "#000",
        textAlign: "center",
        marginBottom: 28,
    },
    status: {
        fontSize: 18,
        fontFamily: "System",
        color: "#43254a",
        textAlign: "center",
        marginBottom: 42,
    },
    swipeLabel: {
        fontSize: 30,
        fontFamily: "System",
        fontWeight: "700",
        color: "#000",
        marginBottom: 36,
    },
    swipeWrapper: {
        width: TRACK_WIDTH,
        alignItems: "center",
    },
    track: {
        width: TRACK_WIDTH,
        height: TRACK_HEIGHT,
        borderRadius: TRACK_HEIGHT / 2,
        borderWidth: 8,
        borderColor: "#4b2554",
        backgroundColor: "transparent",
        justifyContent: "center",
        paddingHorizontal: HORIZONTAL_PADDING,
    },
    trackHint: {
        position: "absolute",
        alignSelf: "center",
        fontSize: 17,
        fontFamily: "System",
        color: "#4b2554",
        opacity: 0.55,
    },
    knob: {
        width: KNOB_SIZE,
        height: KNOB_SIZE,
        borderRadius: KNOB_SIZE / 2,
        backgroundColor: "#4b2554",
        justifyContent: "center",
        alignItems: "center",
    },
    knobArrow: {
        fontSize: 38,
        color: "#fff",
        lineHeight: 40,
    },
    backText: {
        marginTop: 42,
        fontSize: 18,
        color: "#43254a",
        fontFamily: "System",
        textDecorationLine: "underline",
    },
});
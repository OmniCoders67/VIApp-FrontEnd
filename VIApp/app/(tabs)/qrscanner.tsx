import { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Vibration,
    Image,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useCallback } from 'react';

export default function QRScannerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [torchOn, setTorchOn] = useState(false);
    const [scanned, setScanned] = useState(false);
    const cameraRef = useRef(null);
    useFocusEffect(
        useCallback(() => {
            setScanned(false);
        }, [])
    );

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                {/* Back Arrow */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/main')}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <Text style={styles.permissionText}>
                    Camera access is required to scan QR codes
                </Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
        if (scanned) return;
        setScanned(true);
        Vibration.vibrate(100);

        // Extract course name from "CourseName|TOKEN" format
        const courseName = data.includes('|') ? data.split('|')[0] : data;

        router.push({
            pathname: '/(tabs)/swipePage',
            params: { courseName },
        });
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFillObject}
                facing="back"
                enableTorch={torchOn}
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />

            <View style={styles.overlay}>
                {/* Back Arrow */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/main')}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <View style={styles.overlayTop} />
                <View style={styles.overlayMiddle}>
                    <View style={styles.overlaySide} />
                    <View style={styles.scanArea}>
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </View>
                    <View style={styles.overlaySide} />
                </View>
                <View style={styles.overlayBottom}>
                    <TouchableOpacity
                        style={[styles.torchButton, torchOn && styles.torchButtonActive]}
                        onPress={() => setTorchOn(prev => !prev)}
                    >
                        <Image
                            source={require('../Photo/flashlightvector.png')}
                            style={[styles.torchImage, torchOn && styles.torchImageActive]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const SCAN_AREA_SIZE = 250;
const CORNER_SIZE = 30;
const CORNER_THICKNESS = 5;
const CORNER_RADIUS = 6;
const OVERLAY_COLOR = 'rgba(0,0,0,0.55)';

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
        padding: 8,
    },
    backArrow: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: '600',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        backgroundColor: '#fff',
    },
    permissionText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#333',
    },
    permissionButton: {
        backgroundColor: '#3d1f5e',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 12,
    },
    permissionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'column',
    },
    overlayTop: {
        flex: 1,
        backgroundColor: OVERLAY_COLOR,
    },
    overlayMiddle: {
        flexDirection: 'row',
        height: SCAN_AREA_SIZE,
    },
    overlaySide: {
        flex: 1,
        backgroundColor: OVERLAY_COLOR,
    },
    overlayBottom: {
        flex: 1,
        backgroundColor: OVERLAY_COLOR,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 36,
    },
    scanArea: {
        width: SCAN_AREA_SIZE,
        height: SCAN_AREA_SIZE,
    },
    corner: {
        position: 'absolute',
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        borderColor: '#3d1f5e',
    },
    topLeft: {
        top: 0, left: 0,
        borderTopWidth: CORNER_THICKNESS,
        borderLeftWidth: CORNER_THICKNESS,
        borderTopLeftRadius: CORNER_RADIUS,
    },
    topRight: {
        top: 0, right: 0,
        borderTopWidth: CORNER_THICKNESS,
        borderRightWidth: CORNER_THICKNESS,
        borderTopRightRadius: CORNER_RADIUS,
    },
    bottomLeft: {
        bottom: 0, left: 0,
        borderBottomWidth: CORNER_THICKNESS,
        borderLeftWidth: CORNER_THICKNESS,
        borderBottomLeftRadius: CORNER_RADIUS,
    },
    bottomRight: {
        bottom: 0, right: 0,
        borderBottomWidth: CORNER_THICKNESS,
        borderRightWidth: CORNER_THICKNESS,
        borderBottomRightRadius: CORNER_RADIUS,
    },
    torchButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    torchButtonActive: {
        backgroundColor: '#3d1f5e',
        borderColor: '#3d1f5e',
    },
    torchImage: {
        width: 28,
        height: 28,
        tintColor: '#ffffff',
    },
    torchImageActive: {
        tintColor: '#ffffff',
    },
});
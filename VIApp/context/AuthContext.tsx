import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    id: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

interface AuthContextType {
    token: string | null;
    name: string | null;
    role: string | null;
    isLoading: boolean;
    saveToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const extractFromToken = (t: string) => {
        try {
            const decoded = jwtDecode<JwtPayload>(t);
            console.log("=== JWT DECODED ===");
            console.log(JSON.stringify(decoded, null, 2));

            const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            console.log("name:", name);
            console.log("role:", role);

            setName(name ?? null);
            setRole(role ?? null);
        } catch (e) {
            console.log("JWT decode error:", e);
            setName(null);
            setRole(null);
        }
    };

    useEffect(() => {
        const loadToken = async () => {
            const stored = await AsyncStorage.getItem("token");
            if (stored) {
                setToken(stored);
                extractFromToken(stored);
            }
            setIsLoading(false);
        };
        loadToken();
    }, []);

    const saveToken = async (newToken: string) => {
        await AsyncStorage.setItem("token", newToken);
        setToken(newToken);
        extractFromToken(newToken);
    };

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setToken(null);
        setName(null);
        setRole(null);
        router.replace("/");
    };

    return (
        <AuthContext.Provider value={{ token, name, role, isLoading, saveToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
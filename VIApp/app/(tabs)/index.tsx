import React, { useState } from 'react';
import { login, LoginRequest } from "@/api/auth";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { saveToken } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    try {
      const request: LoginRequest = { email, password };
      const response = await login(request);
      console.log('Logged in:', response);

      await saveToken(response.token); // ← already awaited, but state updates are async

      // small delay to let context state update before navigating
      setTimeout(() => {
        router.replace('/(tabs)/main');
      }, 100);

    } catch (e) {
      if (e instanceof Error) {
        Alert.alert('Login Failed', e.message);
      }
    }
  };

  return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#efefef" />
        <View style={styles.container}>

          {/* Logo */}
          <Image
              source={require('../Photo/logo.png')}
              style={{ width: 200, height: 100 }}
              resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>LOGIN</Text>

          {/* Form */}
          <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder="EMAIL"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="PASSWORD"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          {/* Sign Up link */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>DON'T HAVE AN ACCOUNT? </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/Register')}>
              <Text style={styles.signupLink}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    backgroundColor: '#efefef',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 2,
    marginBottom: 28,
    marginTop: 16,
  },
  form: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 1,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3b2060',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#3b2060',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 11,
    color: '#555',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  signupLink: {
    fontSize: 11,
    color: '#3b2060',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
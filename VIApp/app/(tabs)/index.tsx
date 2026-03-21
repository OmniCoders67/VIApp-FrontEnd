import React, { useState } from 'react';
import { register } from "../../api/auth";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

// Geometric logo matching the VIApp brand mark
const VIAppLogo = () => (
    <Image
        source={require('../Photo/logo.png')}
        style={{ width: 200, height: 100 }}
        resizeMode="contain"
    />
);

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const user = await register(email, password);
      console.log("User created:", user);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
        <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
        <View style={styles.container}>

          {/* Logo */}
          <VIAppLogo />

          {/* Title */}
          <Text style={styles.title}>REGISTER</Text>

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
                placeholder="NAME"
                placeholderTextColor="#888"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="PASSWORD"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="CONFIRM PASSWORD"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount} activeOpacity={0.85}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          {/* Login link */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>ALREADY HAVE AN ACCOUNT? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text style={styles.loginLink}>LOG IN</Text>
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
    paddingHorizontal: 32,
    backgroundColor: '#efefef',
  },

  // Logo
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5b9bd5',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 28,
    backgroundColor: '#fff',
  },
  logoBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  logoAppText: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: '700',
    color: '#5a3e8a',
    letterSpacing: 0.5,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1,
  },
  logoVI: {
    color: '#2c2c2c',
  },
  logoApp2: {
    color: '#7b4fa8',
  },

  // Title
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 2,
    marginBottom: 24,
  },

  // Form
  form: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
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

  // Button
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3b2060',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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

  // Login row
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 11,
    color: '#555',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loginLink: {
    fontSize: 11,
    color: '#3b2060',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
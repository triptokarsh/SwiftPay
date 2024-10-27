import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';

const { width } = Dimensions.get('window');

type MessageType = 'success' | 'error' | null;

export default function BiometricVerifyScreen() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>(null);
  
  const messageAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(compatible);
  };

  const showMessage = (text: string, type: MessageType) => {
    setMessage(text);
    setMessageType(type);
    
    messageAnim.setValue(0);
    Animated.sequence([
      Animated.spring(messageAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(messageAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setMessage('');
      setMessageType(null);
    });
  };

  const handleBiometricAuth = async () => {
    if (!isBiometricSupported) {
      showMessage('Biometric authentication is not supported on this device.', 'error');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Verify your identity',
      fallbackLabel: 'Use passcode',
    });

    if (result.success) {
      showMessage('Biometric authentication successful!', 'success');
    } else {
      showMessage('Biometric authentication failed. Please try again.', 'error');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.verifyButton} onPress={handleBiometricAuth}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      {message && (
        <Animated.View 
          style={[
            styles.messageContainer,
            messageType === 'success' ? styles.successMessage : styles.errorMessage,
            {
              opacity: messageAnim,
              transform: [
                { 
                  translateY: messageAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={styles.messageText}>{message}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  verifyButton: {
    backgroundColor: "#000000",
    width: 200,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  verifyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  messageContainer: {
    position: 'absolute',
    bottom: 40,
    width: width * 0.9,
    maxWidth: 400,
    padding: 16,
    borderRadius: 12,
  },
  successMessage: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  errorMessage: {
    backgroundColor: '#FFEBEE',
    borderColor: '#EF5350',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1A1A1A',
  },
});
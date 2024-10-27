import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const { width } = Dimensions.get('window');

type RootStackParamList = {
  HomeScreen: undefined;
  SignupScreen: undefined;
};

type MessageType = 'success' | 'error' | null;

export default function SignupScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const messageAnim = useRef(new Animated.Value(0)).current;
  
  const inputAnimations = {
    email: useRef(new Animated.Value(0)).current,
    password: useRef(new Animated.Value(0)).current,
    confirmPassword: useRef(new Animated.Value(0)).current,
  };

  React.useEffect(() => {
    animateIn();
  }, []);

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    Object.values(inputAnimations).forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 200,
        useNativeDriver: true,
      }).start();
    });
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

  const handleFocus = (input: keyof typeof inputAnimations) => {
    Animated.spring(inputAnimations[input], {
      toValue: 1.02,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = (input: keyof typeof inputAnimations) => {
    Animated.spring(inputAnimations[input], {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      showMessage("Please fill out all fields.", 'error');
      return;
    }
    
    if (password !== confirmPassword) {
      showMessage("Passwords do not match", 'error');
      return;
    }
//validate email through regex 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Invalid email address", 'error');
      return;
    }
    showMessage("Account created successfully!", 'success');
    setTimeout(() => navigation.navigate("HomeScreen"), 1500);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.formContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Begin your journey with us</Text>

        {Object.entries(inputAnimations).map(([key, anim]) => (
          <Animated.View 
            key={key}
            style={{
              opacity: anim,
              transform: [{ scale: anim }],
              width: '100%',
            }}
          >
            <TextInput
              style={[styles.input, styles.inputShadow]}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              placeholderTextColor="#8E8E93"
              onChangeText={
                key === 'email' ? setEmail :
                key === 'password' ? setPassword :
                setConfirmPassword
              }
              value={
                key === 'email' ? email :
                key === 'password' ? password :
                confirmPassword
              }
              secureTextEntry={key !== 'email'}
              keyboardType={key === 'email' ? "email-address" : "default"}
              autoCapitalize="none"
              onFocus={() => handleFocus(key as keyof typeof inputAnimations)}
              onBlur={() => handleBlur(key as keyof typeof inputAnimations)}
            />
          </Animated.View>
        ))}

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

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Create Account</Text>
        </TouchableOpacity>
      </Animated.View>
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
  formContainer: {
    width: width * 0.9,
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6E6E73",
    marginBottom: 40,
    letterSpacing: 0.3,
  },
  input: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F5F5F7",
    color: "#1A1A1A",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  inputShadow: {
    shadowColor: '#A767C2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
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
  signupButton: {
    backgroundColor: "#A767C2",
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  signupText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
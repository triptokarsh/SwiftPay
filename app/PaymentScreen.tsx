import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation, useRoute } from "@react-navigation/native";

const EnterAmountScreen: React.FC = () => {
  const [amount, setAmount] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const [amountAlert, setAmountAlert] = useState(false);
  const { name } = route.params as { name: string };
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  useEffect(() => {
    if (amount.trim() === "") {
      return;
    }

    if (isNaN(Number(amount))) {
      setAmountAlert(true);
    }else{
      setAmountAlert(false);
    }
  }, [amount]);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(compatible);
  };

  const handleBiometricAuth = async () => {
    if (!isBiometricSupported) {
      Alert.alert(
        "Error",
        "Biometric authentication is not supported on this device."
      );
      return;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to confirm payment",
        fallbackLabel: "Use passcode",
      });

      if (result.success) {
        navigation.navigate({
          name: "PayResult",
          params: { success: true },
        } as never);
      } else {
        navigation.navigate({
          name: "PayResult",
          params: { success: false },
        } as never);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      navigation.navigate({
        name: "PayResult",
        params: { success: false },
      } as never);
    }
  };

  const handlePayPress = () => {
    if (amount.trim() === ""|| isNaN(Number(amount))) {
        setAmountAlert(true);
      return;
    }
    handleBiometricAuth();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Pay" as never)}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen" as never)}
        >
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#999"
        />
        {amountAlert && (
          <Text style={{ color: "#FE3030"}}>Please enter a valid amount</Text>
        )}
        <TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  payButton: {
    backgroundColor: "#A767C2",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 40,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EnterAmountScreen;

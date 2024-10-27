import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import QRCode from "react-native-qrcode-svg";
import { ArrowLeft } from "lucide-react-native";
import logo from "@/assets/images/icon.png";
import { captureRef } from 'react-native-view-shot';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function CustomQRCodeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { contact } = route.params as { contact: string } || { contact: "" };
  
  const qrRef = useRef<View>(null);

  const generateQRData = () => {
    const data = { contact };
    return JSON.stringify(data);
  };

  const saveQRCode = async () => {
    if (!qrRef.current) {
      console.error('QR code reference is null');
      Alert.alert('Error', 'Unable to save QR code. Please try again.');
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant permission to save the QR code.');
        return;
      }

      const imageUri = await captureRef(qrRef, {
        format: 'png',
        quality: 0.8,
      });

      const asset = await MediaLibrary.createAssetAsync(imageUri);
      const album = await MediaLibrary.getAlbumAsync('QR Codes');
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync('QR Codes', asset, false);
      }

      Alert.alert('Success', 'QR code saved to your device in the "QR Codes" album.');
    } catch (error) {
      console.error('Error saving QR code:', error);
      Alert.alert('Error', 'Failed to save QR code. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receive</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen" as never)}
        >
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.qrContainer} ref={qrRef}>
          <QRCode
            value={generateQRData()}
            size={280}
            logo={logo}
            logoSize={40}
            logoBackgroundColor="transparent"
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveQRCode}
        >
          <Text style={styles.saveButtonText}>Save QR Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  qrContainer: {
    marginBottom: 40,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: "#8A4FFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
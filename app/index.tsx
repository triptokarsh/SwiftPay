import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const navigation = useNavigation();

  const handleJoin = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            SwiftPay
          </Text>
          <Text style={styles.tagline}>
          Secure Payments, Simplified for Everyone
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
    <Text style={styles.joinText}>Continue</Text>
    <AntDesign name="rightcircleo" size={24} color="white" />
  </TouchableOpacity>
</View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: width ,
    height: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '50%',
    height: '50%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 12,
    color: '#1A1A1A',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent  : 'center',
  },
  joinButton: {
    backgroundColor: '#A767C2',
    width: width * 0.5,
    maxWidth: 300,
    height: 56,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  joinText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
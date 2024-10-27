import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice'; // Import Voice
import * as Speech from 'expo-speech';
import { PermissionsAndroid } from 'react-native';

async function requestMicrophonePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'App needs access to your microphone.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the microphone');
    } else {
      console.log('Microphone permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}


const VoiceInputComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
   
    useEffect(() => {
        requestMicrophonePermission();
    }, []);

  useEffect(() => {
    // Event listeners for voice recognition
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    // Cleanup function
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (event:any) => {
    const text = event.value[0]; // Get the recognized speech
    setTranscription(text); // Set the transcription
    Speech.speak(`You said: ${text}`); // Speak the transcription
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US'); // Start voice recognition
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop(); // Stop voice recognition
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening(); // Stop if already listening
    } else {
      setTranscription(''); // Clear previous transcription
      startListening(); // Start listening
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.transcriptionContainer}>
        {isListening ? (
          <Text style={styles.listeningText}>Listening...</Text>
        ) : (
          <Text style={styles.transcriptionText}>{transcription}</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, isListening && styles.buttonListening]}
        onPress={toggleListening}
      >
        <Text style={styles.buttonText}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  transcriptionContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transcriptionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  listeningText: {
    fontSize: 18,
    color: '#888',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonListening: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VoiceInputComponent;

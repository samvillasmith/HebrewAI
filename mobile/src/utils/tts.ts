import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

export const speak = async (text: string, language: string = 'he-IL'): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Stop any ongoing speech
    Speech.stop();

    const options: Speech.SpeechOptions = {
      language,
      pitch: 1.0,
      rate: 0.8, // Slower for language learning
      onDone: () => resolve(),
      onError: (error) => {
        console.error('TTS Error:', error);
        reject(error);
      },
    };

    // For Hebrew, use iOS/Android native TTS
    if (Platform.OS === 'ios') {
      options.voice = 'com.apple.ttsbundle.Carmit-compact'; // Hebrew voice on iOS
    }

    Speech.speak(text, options);
  });
};

export const stopSpeaking = () => {
  Speech.stop();
};

export const isSpeaking = async (): Promise<boolean> => {
  return Speech.isSpeakingAsync();
};

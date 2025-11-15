import { Audio } from 'expo-av';

type Gender = 'male' | 'female';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.254.3:8000';

let currentSound: Audio.Sound | null = null;

export const speak = async (
  text: string,
  language: string = 'he',
  gender: Gender = 'male'
): Promise<void> => {
  try {
    // Stop any currently playing audio
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      currentSound = null;
    }

    // Call backend TTS API with gender parameter
    const response = await fetch(`${API_URL}/api/tts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        language: language,
        gender: gender, // 'male' uses he-IL-Wavenet-B, 'female' uses he-IL-Wavenet-A
      }),
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.status}`);
    }

    // Get audio blob and create sound object
    const audioBlob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Audio = (reader.result as string).split(',')[1];
      const { sound } = await Audio.Sound.createAsync(
        { uri: `data:audio/mpeg;base64,${base64Audio}` },
        { shouldPlay: true }
      );
      currentSound = sound;

      // Clean up when done
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          currentSound = null;
        }
      });
    };

    reader.readAsDataURL(audioBlob);
  } catch (error) {
    console.error('Error with text-to-speech:', error);
    throw error;
  }
};

export const stopSpeaking = async () => {
  if (currentSound) {
    await currentSound.stopAsync();
    await currentSound.unloadAsync();
    currentSound = null;
  }
};

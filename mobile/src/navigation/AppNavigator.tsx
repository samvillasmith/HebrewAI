import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth, useOAuth } from '@clerk/clerk-expo';
import DashboardScreen from '../screens/DashboardScreen';
import LessonScreen from '../screens/LessonScreen';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

function SignInScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={styles.signInContainer}>
      <Text style={styles.signInTitle}>HebrewAI</Text>
      <Text style={styles.signInSubtitle}>Learn Hebrew with AI</Text>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <>
      <SignedIn>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Lesson"
              component={LessonScreen}
              options={{
                title: 'Lesson',
                headerStyle: { backgroundColor: '#6366f1' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <SignInScreen />
      </SignedOut>
    </>
  );
}

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  signInTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  signInSubtitle: {
    fontSize: 20,
    color: '#6b7280',
    marginBottom: 40,
  },
  signInButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

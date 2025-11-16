import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo';
import DashboardScreen from '../screens/DashboardScreen';
import LessonScreen from '../screens/LessonScreen';
import VocabularyScreen from '../screens/VocabularyScreen';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomHeader() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = async () => {
    setShowMenu(false);
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.error('Error signing out:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerTitle}>HebrewAI</Text>
        <Text style={styles.headerSubtitle}>
          {user?.firstName ? `Welcome, ${user.firstName}!` : 'Learn Hebrew'}
        </Text>
      </View>

      {/* User Button */}
      <TouchableOpacity
        style={styles.userButton}
        onPress={() => setShowMenu(true)}
      >
        {user?.imageUrl ? (
          <Image source={{ uri: user.imageUrl }} style={styles.userAvatar} />
        ) : (
          <View style={styles.userAvatarPlaceholder}>
            <Text style={styles.userAvatarText}>
              {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || '?'}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* User Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              {user?.imageUrl ? (
                <Image source={{ uri: user.imageUrl }} style={styles.menuAvatar} />
              ) : (
                <View style={styles.menuAvatarPlaceholder}>
                  <Text style={styles.menuAvatarText}>
                    {user?.firstName?.charAt(0) || '?'}
                  </Text>
                </View>
              )}
              <Text style={styles.menuName}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text style={styles.menuEmail}>
                {user?.emailAddresses[0]?.emailAddress}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSignOut}
            >
              <Text style={styles.menuItemText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        header: () => <CustomHeader />,
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Learn',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>📚</Text>
          ),
        }}
      />
      <Tab.Screen
        name="VocabularyTab"
        component={VocabularyScreen}
        options={{
          tabBarLabel: 'Review',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>🧠</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
              name="Main"
              component={TabNavigator}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  userButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 20,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  menuAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  menuAvatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  menuEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuItem: {
    padding: 16,
    borderTopWidth: 0,
  },
  menuItemText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
    textAlign: 'center',
  },
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

# HebrewAI Mobile App

React Native mobile app for learning Hebrew, built with Expo.

## Features

- ✅ User authentication with Clerk
- ✅ Progress tracking across lessons
- ✅ Interactive lesson viewer
- ✅ Vocabulary learning and review
- ✅ Course completion tracking
- ✅ Cross-platform (iOS, Android, Web)

## Prerequisites

- Node.js 18+ installed
- Expo CLI (`npm install -g expo-cli`)
- Backend API running on `http://localhost:8000`

## Setup

1. Install dependencies:
```bash
cd mobile
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Add your Clerk publishable key to `.env`:
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

## Running the App

### Development Mode

Start the Expo development server:
```bash
npm start
```

This will open Expo DevTools in your browser. From here you can:

- Press `i` to open iOS Simulator (macOS only)
- Press `a` to open Android Emulator
- Press `w` to open in web browser
- Scan QR code with Expo Go app on your phone

### Platform-Specific Commands

**iOS (macOS only):**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

## Project Structure

```
mobile/
├── src/
│   ├── api/              # API client and requests
│   ├── components/       # Reusable components
│   ├── constants/        # App constants and config
│   ├── data/             # Static data (curriculum)
│   ├── navigation/       # Navigation setup
│   ├── screens/          # App screens
│   └── types/            # TypeScript type definitions
├── App.tsx               # App entry point
└── package.json
```

## Key Libraries

- **Expo** - React Native framework
- **React Navigation** - Navigation library
- **Clerk** - Authentication
- **Axios** - HTTP client
- **TypeScript** - Type safety

## API Configuration

The app connects to the backend API at `http://localhost:8000`. To change this:

1. Edit `src/constants/config.ts`
2. Update the `API_URL` constant

For production, use your deployed backend URL.

## Building for Production

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

### Publishing with EAS

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Build and publish:
```bash
eas build --platform all
eas submit
```

## Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### Clear Expo Cache
```bash
expo start -c
```

### iOS Simulator Not Opening
Make sure Xcode is installed and command line tools are configured:
```bash
xcode-select --install
```

### Android Emulator Issues
Ensure Android Studio is installed with an AVD configured.

## Development Notes

- Backend API must be running for the app to function
- Use Expo Go app for quick testing on physical devices
- Hot reload is enabled by default

## License

MIT

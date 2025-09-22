import React from 'react';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '169392000943-vkej3l467qr74c41p61pbtsi1qjfpegr.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  return <AppNavigator />;
}


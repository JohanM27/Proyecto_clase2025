import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'TU_CLIENT_ID_WEB.apps.googleusercontent.com', // ID Web
      offlineAccess: true,
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });
  }, []);

  return <AppNavigator />;
}

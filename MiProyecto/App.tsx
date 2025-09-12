import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomInput from './src/components/CustomInput';
import CustomButton from './src/components/CustomButton';

function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (email.includes('@') && password.length > 3) {
      navigation.replace('Home');
    } else {
      Alert.alert('Error', 'Email o contraseña inválidos');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
  <Text style={{ fontSize: 22, marginBottom: 20, color: '#000' }}>Login</Text>
  <CustomInput placeholder="Email" value={email} onChangeText={setEmail} textColor="#000" />
  <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry textColor="#000" />
  <CustomButton title="Entrar" onPress={onLogin} />
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Text style={{ fontSize: 22, color: '#000' }}>Bienvenido 👋</Text>
    </View>
  );
}

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

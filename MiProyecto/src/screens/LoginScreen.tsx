
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (!email.includes('@') || password.length < 4) {
      Alert.alert('Email o contraseña inválidos');
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Login exitoso', 'Bienvenido');
      // navigation.replace('Home'); // Descomenta si tienes Home
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Usuario no encontrado');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Contraseña incorrecta');
      } else {
        Alert.alert('Error al iniciar sesión', error.message);
      }
    }
  };

  const onRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Login</Text>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
  <CustomButton title="Entrar" onPress={onLogin} />
  <View style={{ height: 10 }} />
  <CustomButton title="Registrarse" onPress={onRegister} />
    </View>
  );
}

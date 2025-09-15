import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegister = async () => {
    if (!email.includes('@') || password.length < 4) {
      Alert.alert('Email o contraseña inválidos');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      await firestore().collection('users').doc(userCredential.user.uid).set({
        email: userCredential.user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Registro exitoso', 'Usuario registrado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('El email ya está en uso');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Email inválido');
      } else {
        Alert.alert('Error al registrar', error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Registro</Text>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomInput placeholder="Confirmar contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <CustomButton title="Registrarse" onPress={onRegister} />
      <CustomButton title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

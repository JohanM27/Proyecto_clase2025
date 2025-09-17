import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#E3F2FD', // azul claro
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#90CAF9',
    backgroundColor: '#fff',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2', // azul
    marginBottom: 18,
    letterSpacing: 1,
    textShadowColor: '#90CAF9',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegister = async () => {
  console.log('onRegister called');
  console.log('navigation:', navigation);
    if (!email.includes('@') || password.length < 4) {
  console.log('Validando email y password:', email, password);
      Alert.alert('Email o contraseña inválidos');
      return;
    }
    if (password !== confirmPassword) {
  console.log('Validando confirmación de password:', password, confirmPassword);
      Alert.alert('Las contraseñas no coinciden');
      return;
    }
    try {
      console.log('Intentando crear usuario:', email);
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      console.log('Usuario creado:', userCredential.user.uid);
      await firestore().collection('users').doc(userCredential.user.uid).set({
        email: userCredential.user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Usuario guardado en Firestore');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Registro exitoso, solo limpiar los campos


    } catch (error: any) {
  console.log('Error en registro:', error);
      console.log('Error en registro:', error);
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
    <View style={styles.container}>
      <Image
        source={require('../assets/imagen.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Registro</Text>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomInput placeholder="Confirmar contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <CustomButton title="Registrarse" onPress={onRegister} />
      <CustomButton title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

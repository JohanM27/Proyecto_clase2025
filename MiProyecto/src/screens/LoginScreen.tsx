import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';


export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (email.includes('@') && password.length > 3) {
      navigation.replace('Home');
    } else {
      Alert.alert('Email o contraseña inválidos');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Login</Text>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomButton title="Entrar" onPress={onLogin} />
    </View>
  );
}

import React from 'react';
import { View, Text, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Bienvenido 👋</Text>
      <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100 }} />
    </View>
  );
}

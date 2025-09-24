import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Bienvenido 👋</Text>
      
      <CustomButton
        title="Agendar cita"
        onPress={() => navigation.navigate('AgendarCita')}
      />
    </View>
  );
}

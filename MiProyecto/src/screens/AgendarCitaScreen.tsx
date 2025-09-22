
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const AgendarCitaScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAgendar = () => {
    if (!selectedDate) {
      Alert.alert('Selecciona una fecha');
      return;
    }
    // Aquí se integrará la lógica para Google Calendar
    Alert.alert('Cita agendada para', selectedDate.toLocaleDateString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Cita</Text>
      <CalendarPicker
        onDateChange={(date: Date) => setSelectedDate(date)}
        selectedDayColor="#1976D2"
        todayBackgroundColor="#E3F2FD"
      />
      <Button title="Agendar" onPress={handleAgendar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default AgendarCitaScreen;

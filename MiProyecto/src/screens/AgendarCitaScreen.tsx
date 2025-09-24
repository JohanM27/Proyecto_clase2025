import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

const AgendarCitaScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAgendar = async () => {
    let token: string | null = null;

    try {
      // Intentar login silencioso
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signInSilently();
      const tokens = await GoogleSignin.getTokens();
      token = tokens.accessToken;
    } catch {
      // Si no está logueado, hacer login normal
      try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();
        const tokens = await GoogleSignin.getTokens();
        token = tokens.accessToken;
      } catch (error) {
        Alert.alert('Error', 'No se pudo autenticar con Google');
        return;
      }
    }

    if (!token) {
      Alert.alert('Error', 'No se pudo obtener token de Google');
      return;
    }

    if (!selectedDate) {
      Alert.alert('Error', 'Selecciona una fecha');
      return;
    }

    const event = {
      summary: 'Cita agendada',
      description: 'Cita creada desde la app',
      start: {
        dateTime: selectedDate.toISOString(),
        timeZone: 'America/Mexico_City',
      },
      end: {
        dateTime: new Date(selectedDate.getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: 'America/Mexico_City',
      },
    };

    try {
      const response = await axios.post(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        event,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Cita guardada', 'Se guardó en tu Google Calendar');
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.error?.message || 'No se pudo guardar la cita'
      );
    }
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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});

export default AgendarCitaScreen;

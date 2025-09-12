import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  textColor?: string;
};

export default function CustomInput({ placeholder, value, onChangeText, secureTextEntry, textColor }: Props) {
  return (
    <TextInput
      style={[styles.input, textColor ? { color: textColor } : null]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={textColor || '#999'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
});

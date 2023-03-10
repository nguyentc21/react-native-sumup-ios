import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import type {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

const Button = (
  props: PressableProps & {
    label?: string;
    description?: string;
    processing?: boolean;
  }
) => {
  const { label, description, processing, ..._props } = props;
  return (
    <Pressable
      style={({
        pressed,
      }: PressableStateCallbackType): StyleProp<ViewStyle> => [
        styles.button,
        !!processing && { backgroundColor: '#888' },
        pressed && { opacity: 0.3 },
      ]}
      disabled={!!processing}
      {..._props}
    >
      <Text style={styles.label}>{label}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
      {!!processing && <ActivityIndicator style={{ marginTop: 10 }} />}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: '#ddd',
    fontSize: 15,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '60%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
});

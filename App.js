import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen'; // Adjust this import path as needed

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <HomeScreen />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
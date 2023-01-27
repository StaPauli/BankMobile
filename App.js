import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import showHomePage from './src/Home/homepage';

export default function App() {
  return (
      showHomePage()
  );
}

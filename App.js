import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import showHomePage from './src/Home/homepage';

export default function App() {
  return (
      showHomePage()
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

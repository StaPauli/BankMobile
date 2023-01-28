import React from "react";
import { StyleSheet} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/Login/LoginScreen";
import SignUpScreen from "./src/SignUp/SingUpScreen";
import showHomePage  from './src/Home/homepage';

const Stack = createNativeStackNavigator();


function HomePage() {
    return (
        showHomePage()
    );
}

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }}/>
          </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },

})

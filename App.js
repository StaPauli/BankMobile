import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text} from "react-native";
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/Login/LoginScreen";
import SignUpScreen from "./src/SignUp/SingUpScreen";
import ShowHomePage  from './src/Home/homepage';
import { db } from './src/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Home" component={ShowHomePage} options={{ headerShown: false }}/>
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

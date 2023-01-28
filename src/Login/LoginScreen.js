import React, {useEffect, useState} from "react";
import { StyleSheet, View} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Home");
            }
        });

       return unsubscribe;
    }, []);

    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));

    };

    return(
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image source={require("../staticResources/atm-card2.png")} style={{width: 200, height: 200}}/>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button1} onPress={signIn} title="Login" />
            <Button onPress={() => navigation.navigate("SignUp")} containerStyle={styles.button2}  type="outline" title="Register" />
            <View style={{height: 25}} />
        </View >
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },

    inputContainer: {
        width: 300,
    },
    button1: {
        width: 200,
        marginTop: 10,
    },
    button2: {
        marginTop: 5,
        borderWidth: 2,
        borderColor: '#2C6BED',
        width: 200,
    },


})
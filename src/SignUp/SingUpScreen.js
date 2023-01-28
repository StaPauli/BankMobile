import React, {useLayoutEffect, useState} from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from '../firebase';


const SingUpScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confrimpassword, setConfirmPassword] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "ABC",
        });
    }, [navigation]);

    const signup = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                let promise = authUser.user.updateProfile({
                    displayName: name,
                });
            })
            .catch((error) => alert(error.message));
    };

    return(
        <View style={styles.container}>
            <StatusBar style="light" />

            <Text h3 style={{marginBottom: 50}}>
                Create a account
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder="Confirm Password"
                    type="password"
                    secureTextEntry
                    value={confrimpassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </View>


            <Button
                containerStyle={styles.button}
                raised
                onPress={signup}
                title="Register"
            />
        </View>
    )
}

export default SingUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    button: {
        width: 120,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    }

})
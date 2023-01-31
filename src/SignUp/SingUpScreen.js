import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import {Button, Image, Input, Text} from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from '../firebase';
import {MaterialCommunityIcons} from "@expo/vector-icons";

const SingUpScreen = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confrimpassword, setConfirmPassword] = useState("");
    const [show, setShow] = useState(false)
    const [visible, setVisible] = useState(true)
    const [show2, setShow2] = useState(false)
    const [visible2, setVisible2] = useState(true)



    const signup = () => {

        if(password===confrimpassword)
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                let promise = authUser.user.updateProfile({
                    displayName: name,
                });
            })
            .catch((error) => alert(error.message));
        else {
            alert("The passwords are different")
        }
    };

    return(
        <View style={styles.container}>
            <Image source={require("../staticResources/atm-card2.png")} style={styles.image2}/>
            <StatusBar style="light" />

            <Text h3 style={{marginBottom: 30, marginTop: 40}}>
                Create an account
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
                    secureTextEntry={visible}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder="Confirm Password"
                    type="password"
                    secureTextEntry={visible2}
                    value={confrimpassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />

                <TouchableOpacity style={styles.btnEye} onPress={
                    () => {
                        setVisible(!visible)
                        setShow(!show)
                    }
                }>


                    <MaterialCommunityIcons
                        name={show === false ? 'eye-outline' : 'eye-off-outline'}
                        size={26}
                        color={"black"}

                    />

                </TouchableOpacity>


                <TouchableOpacity style={styles.btnEye2} onPress={
                    () => {
                        setVisible2(!visible2)
                        setShow2(!show2)
                    }
                }>


                    <MaterialCommunityIcons
                        name={show2 === false ? 'eye-outline' : 'eye-off-outline'}
                        size={26}
                        color={"black"}

                    />

                </TouchableOpacity>

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
    },
    btnEye: {
        position: "absolute",
        right: 5,
        top: 140,
    },
    btnEye2: {
        position: "absolute",
        right: 5,
        top: 210,
    },
    image2: {
        width: 100,
        height: 100,
    }


})
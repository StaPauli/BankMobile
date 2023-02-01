import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { db, auth } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Images from '../staticResources/index';


const SingUpScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confrimpassword, setConfirmPassword] = useState("");
    const [show, setShow] = useState(false)
    const [visible, setVisible] = useState(true)
    const [show2, setShow2] = useState(false)
    const [visible2, setVisible2] = useState(true)

    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAccountNumber, setNewAccountNumber] = useState("");
    const [image, setImage] = useState({
        isDefault: true,
        source: Images.defaultImage
    });
    const [overall, setOverall] = useState(0);

    const usersCollectionRef = collection(db,'users');
    const signup = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                let promise = authUser.user.updateProfile({
                    displayName: name,
                });
                addDoc(usersCollectionRef, {
                    firstName : name.split(' ')[0],
                    lastName : name.split(' ')[1],
                    email : email,
                    accountNumber : String((Math.random() * (2000000 - 1) + 1).toFixed(0)),
                    image : {
                                    isDefault: true,
                                    source: 'require(\'./default_avatar.jpg\')'
                                },
                    overall : 0,
                    transactionHistory : []
                }).then(result2 => {
                    navigation.navigate("Home", {userEmail: email });
                })
                .catch((error) => alert(error.message));
//                              })
//                              .catch((error) => alert(error.message));
            })
            .catch((error) => alert(error.message));
    };

    return(
        <View style={styles.container}>
            <StatusBar style="light" />

            <Text h3 style={{marginBottom: 50}}>
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


})
import 'react-native-gesture-handler';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity ,Alert,LogBox } from 'react-native';
import { NativeBaseProvider,Switch, useColorMode, useColorModeValue  } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mockUser } from '../mockUser';
import CustomCamera from '../Camera/camera';

LogBox.ignoreAllLogs(true);
//TODO: switch to dark mode with native base
//TODO: user image change
const Stack = createNativeStackNavigator();

const Avatar = ({navigation}) => {
    const createAlert = () =>{
        Alert.alert('Edit image', 'Change your profile picture', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'Pick from gallery', onPress: () =>  navigation.navigate('Gallery') },
          {text: 'Take a picture', onPress: () =>  navigation.navigate('Camera') }
        ])
    };
    return (
        <View>
            <TouchableOpacity
                onPress= {createAlert}
                style={styles.avatarContainer}>
                <View>
                    <Image source={mockUser.image.source} style={styles.avatar}/>
                </View>
            </TouchableOpacity >
        </View>
    );
}

const Username = () => {
    return (
        <View>
            <Text style={styles.username}>{mockUser.firstName} {mockUser.lastName}</Text>
        </View>
    );
}

function TakingPictures(){
    return(
            <CustomCamera userImage={mockUser.image}/>
    );
}

function ImageEdition(){
    return(
            <View>
                <Text>Gallery</Text>
            </View>
    );
}

function SettingPage( {navigation} ){
    return (
        <View>
            <Avatar navigation={navigation}/>
            <Username/>
            <View style={styles.switchRow}>
                <Text style={{fontSize:16}}>Dark mode (TODO - switch here) </Text>
            </View>
        </View>
    );
}
export default function showSettings(){

    return (
        <NativeBaseProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        name='Back to settings'
                        component={ SettingPage }
                        options={{ headerShown: false }}

                         />
                    <Stack.Screen name="Gallery"
                            component={ImageEdition}
                             />
                    <Stack.Screen name="Camera"
                            component={TakingPictures}
                             />
                </Stack.Navigator>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%'
    },
    avatar: {
        resizeMode: 'cover',
        height: 250,
        width: 250,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        fontSize: 20,
        padding: '5%'
    },
    switchRow: {
        margin: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});



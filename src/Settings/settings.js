import { Image, StyleSheet, Text, View, TouchableOpacity ,Alert } from 'react-native';
import { NativeBaseProvider,Switch, useColorMode, useColorModeValue  } from 'native-base'
import { mockUser } from '../mockUser';

//TODO: switch to dark mode with native base
export default function showSettings(){
    return (
        <NativeBaseProvider>
            <View>
                <TouchableOpacity
                    onPress={() => {
                      Alert.alert('photo change soon!');
                    }}
                    style={styles.avatarContainer}>
                    <Image source={mockUser.image.source} style={styles.avatar}/>
                </TouchableOpacity >
            </View>
            <View>
                <Text style={styles.username}>{mockUser.firstName} {mockUser.lastName}</Text>
            </View>
            <View style={styles.switchRow}>
                <Text style={{fontSize:16}}>Dark mode (TODO - switch here) </Text>
            </View>
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
})


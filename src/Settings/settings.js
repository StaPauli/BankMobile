import { Image, StyleSheet, Text, View, Pressable,Alert } from 'react-native';
import { mockUser } from '../mockUser';


export default function showSettings(){
    return (
        <View >
            <View>
                <Pressable
                    onPress={() => {
                      Alert.alert('photo change soon!');
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? 'transparent' : 'transparent',
                      },
                      styles.avatarContainer,
                    ]}>
                <Image source={mockUser.image.source} style={styles.avatar}/>
                </Pressable>
            </View>
            <View>
                <Text style={styles.username}>{mockUser.firstName} {mockUser.lastName}</Text>
            </View>
        </View>
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
})


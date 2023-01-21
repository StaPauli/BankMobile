import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { mockUser } from '../mockUser';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function HomeScreen(){
    return(
            <View style={styles.homePageHeader}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Hi, {mockUser.firstName}</Text>
                </View>
                <View style={styles.overallContainer}>
                    <Text style={styles.overall}>{mockUser.overall} zł</Text>
                </View>
                <View>
                    <FlatList
                        data={ mockUser.transactionHistory }
                        renderItem={({item}) =>
                        <View style={styles.transactionHistoryRow}>
                            <Text >{item.key}</Text>
                            <Text >{item.value} zł</Text>
                        </View>
                         }
                    ></FlatList>
                </View>
            </View>


        );
}

function ExampleSettings(){ // here import setting view instead of example text
    return (
        <View>
          <Text>Settings</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function showHomePage () {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                     options={{
                           tabBarLabel: 'Home',
                           tabBarIcon: ({ color, size }) => (
                             <MaterialCommunityIcons name="home" color={color} size={size} />
                           ),
                         }}/>
                 <Tab.Screen
                     name='Wire transfer'
                     component={ExampleSettings}
                     options={{
                         tabBarLabel: 'Wire transfer',
                         tabBarIcon: ({ color, size }) => (
                           <MaterialCommunityIcons name="bank-transfer" color={color} size={size} />
                         ),
                       }}/>
                <Tab.Screen
                    name='Settings'
                    component={ExampleSettings}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="cog" color={color} size={size} />
                        ),
                      }}/>
            </Tab.Navigator>
        </NavigationContainer>
      );
}

const styles = StyleSheet.create({

    homePageHeader: {
        flex: 2,
        height: '20%',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 30
    },
    nameContainer: {
        padding: '2%'
    },
    overall : {
        fontSize: 40,
        padding: '10%'
    },
    overallContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    transactionHistoryRow: {
       flex:2,
       flexDirection: 'row',
       justifyContent: 'space-between',
       padding: '2%',
       paddingLeft: '5%',
       paddingRight: '5%',
    }
});

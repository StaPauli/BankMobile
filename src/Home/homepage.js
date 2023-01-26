import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { mockUser } from '../mockUser';
import showWireTransfer from '../WireTransfer/wireTransfer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const endpointLink = 'exp://192.168.0.6:19000';

function HomeScreen(){
    let tmpOverall = 0.00;
    mockUser.transactionHistory.forEach(item => {
        tmpOverall += parseFloat(item.value);
    });
    mockUser.overall=tmpOverall;
    return(
            <View style={styles.homePageHeader}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Hi, {mockUser.firstName}</Text>
                </View>
                <View style={styles.overallContainer}>
                    <Text style={styles.overall}>{mockUser.overall.toFixed(2)} zł</Text>
                </View>
                <View>
                    <Text style={{ marginLeft : '5%',marginBottom: '3%', fontSize: 20 }}>Your last transactions</Text>
                    <FlatList
                        data={ mockUser.transactionHistory }
                        renderItem={({item}) =>
                        <View style={styles.transactionHistoryRow}>
                            <Text >{item.key}</Text>
                            <Text style={ (item.type == 'in') ? styles.transactionIn : styles.transactionOut }>
                                {item.value} zł</Text>
                        </View>
                         }
                    ></FlatList>
                </View>
            </View>
        );
}
//TODO: setting view instead of example text
function ExampleSettings(){
    return (
        <View>
          <Text>Settings</Text>
        </View>
    );
}

function WireTransferView(){
    return (
        showWireTransfer()
    );
}

const Tab = createBottomTabNavigator();

export default function showHomePage () {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={ HomeScreen }
                     options={{
                           tabBarLabel: 'Home',
                           tabBarIcon: ({ color, size }) => (
                             <MaterialCommunityIcons name="home" color={color} size={size} />
                           ),
                         }}/>
                 <Tab.Screen
                     name='Wire transfer'
                     component={ WireTransferView }
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
       borderBottomColor: 'lightgray',
       borderBottomWidth: 2,
       marginLeft: '5%',
       marginRight: '5%',
    },
    transactionOut: {
        color: 'red'
    },
    transactionIn: {
        color:'green'
    }
});

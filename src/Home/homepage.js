import { FlatList, StyleSheet, Text, View,Pressable,Alert } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { mockUser } from '../mockUser';
import showWireTransfer from '../WireTransfer/wireTransfer';
import showSettings from '../Settings/settings';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';


const Tab = createBottomTabNavigator();

function HomeScreen(){
    let tmpOverall = 0.00;

    mockUser.transactionHistory.forEach(item => {
        tmpOverall += parseFloat(item.value);
    });
    const calculatedOverall = tmpOverall;
    mockUser.overall=calculatedOverall;

    let transactionHistoryList=[];
    if(mockUser.transactionHistory.length >= 5){
        transactionHistoryList=mockUser.transactionHistory.reverse().slice(0, 5);
    }
    else{
        transactionHistoryList=mockUser.transactionHistory.reverse();
    }

    const renderItem = ({item}) => (
        <View style={styles.transactionHistoryRow}>
            <Text >{item.key}</Text>
            <Text style={ (item.type == 'in') ? styles.transactionIn : styles.transactionOut }>
                {item.value} zł</Text>
        </View>
     );

    return(
            <View style={styles.homePageHeader}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Hi, {mockUser.firstName}</Text>
                </View>
                <View style={styles.overallContainer}>
                        <LinearGradient
                          colors={['#f5d817', '#03ba87', '#00d4ff' ]}
                          style={styles.linearGradient}
                        >
                        <View style={styles.insideCircle}>
                            <Text style={styles.overall}>{calculatedOverall.toFixed(2)} zł</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <View style={styles.transactionHeader}>
                        <Text style={{fontSize: 20}}>Your last transactions</Text>
                        <Pressable
                            onPress={() => {
                              Alert.alert('transaction history soon!');
                            }}
                            style={({pressed}) => [
                              {
                                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                              },
                              styles.wrapperCustom,
                            ]}>

                        <Text>History</Text></Pressable>
                    </View>
                    <FlatList
                        data={ transactionHistoryList }
                        renderItem={renderItem}
                    ></FlatList>
                </View>
            </View>
        );
}

function SettingsView(){
    return (
        showSettings()
    );
}

function WireTransferView(){
    return (
        showWireTransfer()
    );
}

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
                    component={SettingsView}
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
        fontSize: 35,
        padding: '10%',

    },
    overallContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:200,

    },
    insideCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 200,
        height: 220,
        width: 220,

    },
    linearGradient: {

        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 200,
        height: 250,
        width: 250,
        },

    transactionHeader: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal : '5%',
        marginBottom: '3%',
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
    },
      wrapperCustom: {
        borderRadius: 8,
        padding: 6,
        marginRight:'5%'
      },
});

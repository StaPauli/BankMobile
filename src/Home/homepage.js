import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View,Pressable,Alert } from 'react-native';
import { NativeBaseProvider, Box, StatusBar, useColorMode } from 'native-base';
import { mockUser } from '../mockUser';
import WireTransfer from '../WireTransfer/wireTransfer';
import Settings from '../Settings/settings';
import TransactionHistory from '../TransactionHistory/transactionHistory';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { auth,db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
let email;
let checkingToSend=0;
let firstName;
let lastName;
let image;

const OverallGradient = ({calculatedOverall}) => {
    return (
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
    );
}


function HomeScreen({navigation,route}){

    let currentEmail = route.params.userEmail;
    const[user,setUser] = useState([]);
    //database GET:
    useEffect(() => {
        const getUser = () => {
            db.collection('users')
                .where('email', '==', currentEmail )
                .get()
                .then(result => {
                    setUser(result.docs.map( (doc) => ({ ...doc.data(), id: doc.id }) ));
                }).catch(error => {
                    console.log(error)
                })
        };
        getUser();
    }, []);

    let tmpOverall = 0.00;

    let listToSend = [];

    let transactionHistoryList=[];
    //summary of transactions
    user.forEach(u => {
        u.transactionHistory.forEach(item => {
            tmpOverall += parseFloat(item.value);
        });
    })
        const calculatedOverall = tmpOverall;
            this.checkingToSend = calculatedOverall;
        user.forEach(u => {
                listToSend = u.transactionHistory;
                this.firstName=u.firstName;
                this.lastName=u.lastName;
                this.image=u.image.source;
                if(u.transactionHistory.length > 5){
                    transactionHistoryList=u.transactionHistory.reverse().slice(0, 5);
                }
                else{
                    transactionHistoryList=u.transactionHistory.reverse();
                }
            });


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
                {
                    user.map((u) => {
                        return (
                            <View>
                                <Text style={styles.name}>Hi, {u.firstName}</Text>
                            </View>
                        );
                    })
                }

                </View>
                <OverallGradient calculatedOverall={calculatedOverall}/>
                <View>
                    <View style={styles.transactionHeader}>
                        <Text style={{fontSize: 20}}>Your last transactions</Text>
                        <Pressable
                            onPress={() => {
                              navigation.navigate('History', {screen : 'History', params: {transactionList : listToSend } })
                            }}
                            style={({pressed}) => [
                              {
                                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                              },
                              styles.wrapperCustom,
                            ]}>

                        <Text>History</Text></Pressable>
                    </View>
                    <View style={{marginBottom: '5%'}}>
                        <FlatList
                            data={ transactionHistoryList }
                            renderItem={renderItem}
                        ></FlatList>
                    </View>
                </View>
            </View>
        );
}


function Home({navigation,route}) {

  return (
    <Tab.Navigator>
        <Tab.Screen
            name='Home'
            component={ HomeScreen }
             options={{
                   tabBarLabel: 'Home',
                   tabBarIcon: ({ color, size }) => (
                     <MaterialCommunityIcons name="home" color={color} size={size} />
                   ),
                 }}
             initialParams={{userEmail: route.params.userEmail}}/>

         <Tab.Screen
             name='Wire transfer'
             component={ WireTransfer }
             options={{
                 tabBarLabel: 'Wire transfer',
                 tabBarIcon: ({ color, size }) => (
                   <MaterialCommunityIcons name="bank-transfer" color={color} size={size} />
                 ),
               }}
           initialParams={{'checking': this.checkingToSend}}/>
        <Tab.Screen
            name='Settings'
            component={Settings}
            options={{
                unmountOnBlur: true,
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cog" color={color} size={size} />
                ),
              }}
           initialParams={{'firstName': this.firstName, 'lastName': this.lastName }}/>
    </Tab.Navigator>
  );
}

export default function ShowHomePage ({route}) {
   this.email = route.params.userEmail;
    return (
        <NativeBaseProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name='Homepage'
                    component= {Home}
                    options={{ headerShown: false }}
                     initialParams={{userEmail : this.email}}
                     />
                <Stack.Screen name="History" component={TransactionHistory} />
            </Stack.Navigator>
        </NativeBaseProvider>
      );
}

const styles = StyleSheet.create({

    homePageHeader: {
        flex: 2,
        height: '20%',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 30,
        margin: '5%'
    },
    nameContainer: {
        padding: '0%'
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

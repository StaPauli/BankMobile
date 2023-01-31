import { ScrollView, StyleSheet, Text, View, TouchableOpacity ,Alert,FlatList } from 'react-native';
import { mockUser } from '../mockUser';

export default function TransactionHistory({route}){
    const renderItem = ({item}) => (
        <View style={styles.transactionHistoryRow}>
            <Text >{item.key}</Text>
            <Text style={ (item.type == 'in') ? styles.transactionIn : styles.transactionOut }>
                {item.value} zł</Text>
        </View>
     );
     console.log(JSON.stringify(route));
     let transactionHistoryList = route.params.params.transactionList;

    return(
        <View>
            <Text style={styles.header}>All transactions</Text>
            <FlatList
                nestedScrollEnabled={true}
                data={ transactionHistoryList }
                renderItem={renderItem}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
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
        header:{
            fontSize: 20,
            margin:'5%'
        }
})
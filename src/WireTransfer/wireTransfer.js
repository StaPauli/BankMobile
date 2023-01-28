import React , {useState} from 'react';
import { Text, View, Button, Alert,Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import { mockUser } from '../mockUser';

export default function showWireTransfer () {
    const [recipientName, setRecipientName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [title, setTitle] = useState('');
    const [checkout, setCheckout] = useState('');

    return (
        <View style={{padding:5, paddingTop: 10}}>
            <Input
              label='Recipient'
              placeholder='Type in recipient name'
              value={recipientName}
              onChangeText={value => setRecipientName(value)}
            />

            <Input
              label='Account'
              placeholder='0000 0000 0000 0000 0000 0000'
              value={accountNumber}
              onChangeText={value => setAccountNumber(value)}
            />

            <Input
              label='Title'
              placeholder='e.g. External wire transfer'
              value={title}
              onChangeText={value => setTitle(value)}
            />
            <Input
                label='Checking account'
                value={mockUser.overall.toString()+' zł'}
                editable ={false}
            />
            <Input
              label='Checkout'
              placeholder='0.00'
              value={checkout}
              onChangeText={value => setCheckout(value)}
            />

            <Button
                style={{borderRadius: 20, width: '50%'}}
                title='Accept'
                onPress={() => { //here HTTP POST to DB, HTTP PUT to User overall
                    Alert.alert('Wire transfer accepted (tmp alert)');
                    setRecipientName('');
                    setAccountNumber('');
                    setTitle('');
                    setCheckout('');
                }}
                color='#7bbdab'
                disabled= {!recipientName || !accountNumber || !title || !checkout}
            />
        </View>
    );

}


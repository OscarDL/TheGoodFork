import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';


export default function WaiterSubmitOrder({navigation}) {
  /*const [{token}, _] = useDataLayerValue();

  const [order, setOrder] = useState({
    item1: {something: 'item 1', quantity: 1},
    item2: {something: 'item 2', quantity: 4}
  });


  const submitOrder = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      user.email = user.email.replace(' ', '');
      const {data} = await axios.post('https://the-good-fork.herokuapp.com/api/auth/register', user, config);

      if (data?.token) {
        await AsyncStorage.setItem('authToken', data.token);

        Alert.alert(
          "Registration successful",
          "Welcome to The Good Fork!",
          [{
            text: 'LET ME IN',
            onPress: () => {
              dispatch({ type: 'SET_TOKEN', token: data.token });
              dispatch({ type: 'SET_USER', user }); // Routes stack will change once user context changes
            }
          }]
        );
        
      } else {
        Alert.alert(
          "Couldn't create account",
          data?.error,
          [{ text: 'RETRY' }]
        );
      }
      
    } catch (error) {
      Alert.alert(
        "Couldn't create account",
        error.response.data.error,
        [{ text: 'RETRY' }]
      );
    }
  };


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <Text style={{...styles.roboto, textAlign: 'center'}}>
        Place an order for a customer here.
      </Text>
      
      <View>
        <Input style={styles.roboto} placeholder='First name' onChangeText={firstName => setOrder({ ...order, firstName })} />
        <Input style={styles.roboto} placeholder='Last name' onChangeText={lastName => setOrder({ ...order, lastName })} />
        <Input style={styles.roboto} placeholder='Email address' autoCapitalize='none' onChangeText={email => setOrder({ ...order, email })} />
        <Input style={styles.roboto} placeholder='Password' secureTextEntry onChangeText={password => setOrder({ ...order, password })} />
        <Input style={styles.roboto} placeholder='Confirm password' secureTextEntry onChangeText={passCheck => setOrder({ ...order, passCheck })} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Register'
          icon={<Icon
            size={28}
            color='white'
            type='material'
            name='how-to-reg'
            style={{marginRight: 10}}
          />}
          onPress={() => submitOrder(order)}
        />
      </View>
    </View>
  );*/
  return (
    <View>
      <Text>MANUALLY SUMBIT AN ORDER</Text>
    </View>
  );
}
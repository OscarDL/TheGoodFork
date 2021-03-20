import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';


const submitOrder = async (token, order, navigation) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const {data} = await axios.post('http://192.168.1.111:9000/api/orders/create', order, config);

    if (data?.success) {
      Alert.alert(
        "Order successful",
        "Your order was submitted successfully.",
        [{
          text: 'DONE',
          onPress: () => navigation.goBack()
        }]
      );
      
    } else {
      Alert.alert(
        "Couldn't submit order.",
        data?.error,
        [{ text: 'RETRY' }]
      );
    }
    
  } catch (error) {
    Alert.alert(
      "Couldn't submit order",
      error.response.data.error,
      [{ text: 'RETRY' }]
    );
  }
};


export default function WaiterSubmitOrder({navigation}) {
  const [{token, currentOrder}, _] = useDataLayerValue();

  const [order, setOrder] = useState({
    user: {email: '', type: 'waiter'},
    appetizer: [],
    mainDish: [],
    dessert: [],
    drinks: [],
    alcohols: [],
    price: 0,
    currency: 'EUR',
  });


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <Text style={{...styles.roboto, textAlign: 'center'}}>
        Place an order for a customer here.
      </Text>
      
      <View>
        <Input style={styles.roboto} placeholder="Customer's email" onChangeText={user => setOrder({ ...order, user: {email: user, type: 'waiter'} })} />
        <Input style={styles.roboto} placeholder='Price' onChangeText={price => setOrder({ ...order, price })} />
        <Input style={styles.roboto} placeholder='Currency' onChangeText={currency => setOrder({ ...order, currency })} />
      </View>
        
      <View style={{alignItems: 'center'}}>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} style={{}} title='Add appetizers' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'appetizer'})}/>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add main dish' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'mainDish'})}/>
        <Button buttonStyle={[styles.button]} title='Add desserts' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'dessert'})}/>
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
          onPress={() => submitOrder(token, order, navigation)}
        />
      </View>
    </View>
  );
}
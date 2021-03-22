import axios from 'axios';
import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
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


export default function WaiterSubmitOrder({navigation, route}) {
  const [{token}, _] = useDataLayerValue();
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  const [order, setOrder] = useState({
    user: {email: '', type: 'waiter'},
    appetizer: null,
    mainDish: null,
    dessert: null,
    drinks: null,
    alcohols: null,
    price: 0,
    currency: 'EUR',
  });

  useEffect(() => {
    // add to the order what the waiter has just added in the screen route parameters
    if (isFocused) {
      route.params.appetizer && setOrder({...order, appetizer: route.params.appetizer});
      route.params.mainDish && setOrder({...order, mainDish: route.params.mainDish});
      route.params.dessert && setOrder({...order, dessert: route.params.dessert});
      route.params.drinks && setOrder({...order, drinks: route.params.drinks});
      route.params.alcohols && setOrder({...order, alcohols: route.params.alcohols});
    }
  }, [isFocused]);


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <Text style={{...styles.roboto, textAlign: 'center'}}>
        Place an order for a customer here.
      </Text>
      
      <View>
        <Input style={styles.roboto} placeholder="Customer's email" onChangeText={user => setOrder({ ...order, user: {email: user, type: 'waiter'} })} />
      </View>
        
      <View style={{alignItems: 'center'}}>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add appetizers' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'appetizer', appetizer: order.appetizer})}/>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add main dish' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'mainDish', mainDish: order.mainDish})}/>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add desserts' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'dessert', dessert: order.dessert})}/>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add drinks' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'drink', drinks: order.drinks})}/>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add alcohols' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'alcohol', alcohols: order.alcohols})}/>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Submit order'
          onPress={() => console.log(order)} //submitOrder(token, order, navigation)}
        />
      </View>
    </View>
  );
}
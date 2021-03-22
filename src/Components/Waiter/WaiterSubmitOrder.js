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
    const {data} = await axios.post('https://the-good-fork.herokuapp.com/api/orders/create', order, config);

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
    drink: null,
    alcohol: null,
    price: 0
  });

  useEffect(() => {
    // add to the order what the waiter has just added in the screen route parameters
    if (isFocused) {
      route.params.appetizer && setOrder(prevOrder => ({...prevOrder, appetizer: route.params.appetizer}));
      route.params.mainDish && setOrder(prevOrder => ({...prevOrder, mainDish: route.params.mainDish}));
      route.params.dessert && setOrder(prevOrder => ({...prevOrder, dessert: route.params.dessert}));
      route.params.drink && setOrder(prevOrder => ({...prevOrder, drink: route.params.drink}));
      route.params.alcohol && setOrder(prevOrder => ({...prevOrder, alcohol: route.params.alcohol}));
    }
  }, [isFocused]);


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <Text style={{...styles.roboto, textAlign: 'center'}}>
        Place an order for a customer here.
      </Text>
      
      <View>
        <Input style={styles.roboto} placeholder="Customer's email" onChangeText={user => setOrder(prevOrder => ({ ...prevOrder, user: {email: user, type: 'waiter'} }))} />
      </View>
        
      <View style={{alignItems: 'center'}}>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add appetizers' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'appetizer', appetizer: order.appetizer})}/>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add main dish' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'mainDish', mainDish: order.mainDish})}/>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add desserts' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'dessert', dessert: order.dessert})}/>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add drinks' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'drink', drink: order.drink})}/>
        <Button buttonStyle={[{...styles.button, marginBottom: 20}]} title='Add alcohols' onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'alcohol', alcohol: order.alcohol})}/>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Submit order'
          onPress={() => submitOrder(token, order, navigation)}
        />
      </View>
    </View>
  );
}
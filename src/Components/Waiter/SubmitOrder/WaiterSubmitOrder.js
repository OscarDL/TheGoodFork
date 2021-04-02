import axios from 'axios';
import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { Input, Button } from 'react-native-elements';

import { styles } from '../../../Reusables/Styles';
import { submitOrder } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';


const handleSubmit = (order, token, navigation) => {
  submitOrder(order, token).then(res => Alert.alert(
    res.success ? res.title : "Could not submit order",
    res.success ? res.desc : res,
    [{
      text: res.success ? "DONE" : "RETRY",
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ))
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
      route.params.appetizer !== undefined && setOrder(prevOrder => ({...prevOrder, appetizer: route.params.appetizer}));
      route.params.mainDish !== undefined && setOrder(prevOrder => ({...prevOrder, mainDish: route.params.mainDish}));
      route.params.dessert !== undefined && setOrder(prevOrder => ({...prevOrder, dessert: route.params.dessert}));
      route.params.drink !== undefined && setOrder(prevOrder => ({...prevOrder, drink: route.params.drink}));
      route.params.alcohol !== undefined && setOrder(prevOrder => ({...prevOrder, alcohol: route.params.alcohol}));
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
        <View style={{marginBottom: 20}}><Button buttonStyle={[styles.button]} title={(!order.appetizer ? 'Ajouter' : 'Modifier') + ' entrées'} onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'appetizer', appetizer: order.appetizer})}/></View>

        <View style={{marginBottom: 20}}><Button buttonStyle={[styles.button]} title={(!order.mainDish ? 'Ajouter' : 'Modifier') + ' plats'} onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'mainDish', mainDish: order.mainDish})}/></View>

        <View style={{marginBottom: 20}}><Button buttonStyle={[styles.button]} title={(!order.dessert ? 'Ajouter' : 'Modifier') + ' desserts'} onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'dessert', dessert: order.dessert})}/></View>

        <View style={{marginBottom: 20}}><Button buttonStyle={[styles.button]} title={(!order.drink ? 'Ajouter' : 'Modifier') + ' boissons'} onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'drink', drink: order.drink})}/></View>
        
        <Button buttonStyle={[styles.button]} title={(!order.alcohol ? 'Ajouter' : 'Modifier') + ' boissons alcoolisées'} onPress={() => navigation.navigate('WaiterOrderDishes', {type: 'alcohol', alcohol: order.alcohol})}/>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Submit order'
          onPress={() => handleSubmit(order, token, navigation)}
        />
      </View>
    </View>
  );
}
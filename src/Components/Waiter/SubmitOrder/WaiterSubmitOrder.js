import React, { useState } from 'react';
import Dialog from 'react-native-dialog';
import { Button } from 'react-native-elements';
import { View, Text, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { styles } from '../../../Reusables/Styles';
import WaiterOrderDishes from './WaiterOrderDishes';
import { submitOrder } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';


const handleSubmit = (order, token, setOrder, setPrice, setDialog) => {
  if (order.appetizer.length === 0) order.appetizer = null;
  if (order.mainDish.length === 0) order.mainDish = null;
  if (order.dessert.length === 0) order.dessert = null;
  if (order.drink.length === 0) order.drink = null;
  if (order.alcohol.length === 0) order.alcohol = null;

  submitOrder(order, token).then(res => Alert.alert(
    res.success ? res.title : "Could not submit order",
    res.success ? res.desc : res,
    [{
      text: res.success ? "DONE" : "RETRY",
      onPress: () => {
        if (res.success) {
          setDialog(false);
          setOrder({
            user: {email: null, type: 'waiter'},
            appetizer: [],
            mainDish: [],
            dessert: [],
            drink: [],
            alcohol: [],
            price: 0
          });
        } else return null
      }
    }]
  ))
};

const Tabs = createMaterialTopTabNavigator();


function WaiterSubmitOrderTabs({order, setOrder, setPrice}) {
  return (
    <Tabs.Navigator initialRouteName='Appetizer' backBehavior='initialRoute' tabBarOptions={{scrollEnabled: true, pressColor: 'darkgrey'}}>
      <Tabs.Screen name='Appetizer'>
        {props => <WaiterOrderDishes {...props} type='appetizer' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='MainDish'>
        {props => <WaiterOrderDishes {...props} type='mainDish' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Dessert'>
        {props => <WaiterOrderDishes {...props} type='dessert' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Drink'>
        {props => <WaiterOrderDishes {...props} type='drink' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Alcohol'>
        {props => <WaiterOrderDishes {...props} type='alcohol' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}


export default function WaiterSubmitOrder() {
  const [{token}, _] = useDataLayerValue();

  const [dialog, setDialog] = useState(false);
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState({
    user: {email: null, type: 'waiter'},
    appetizer: [],
    mainDish: [],
    dessert: [],
    drink: [],
    alcohol: [],
    price: 0
  });

  return <>
    <WaiterSubmitOrderTabs order={order} setOrder={setOrder} setPrice={setPrice}/>
    
    <Dialog.Container visible={dialog}>
      <Dialog.Title style={{fontWeight: '700'}}>Customer email</Dialog.Title>
      <Dialog.Description>
        Please type-in your customer's email address.
      </Dialog.Description>
      <Dialog.Input style={{fontWeight: '700'}} onChangeText={email => setOrder({...order, user: {email, type: 'waiter'}})}/>
      <Dialog.Button label='Cancel' style={{fontWeight: '700'}} onPress={() => {setOrder({...order, user: {email: null, type: 'waiter'}}); setDialog(false)}} />
      <Dialog.Button label='Done' style={{fontWeight: '700'}} onPress={() => handleSubmit(order, token, setOrder, setDialog)} />
    </Dialog.Container>

    <View style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total: {price}</Text>
      <Button buttonStyle={[styles.button]} onPress={() => setDialog(true)} title='Place order'/>
    </View>
  </>
}
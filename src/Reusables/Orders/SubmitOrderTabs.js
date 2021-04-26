import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import OrderDishes from './OrderDishes';


const Tabs = createMaterialTopTabNavigator();

export default function SubmitOrderTabs({order, setOrder, setPrice}) {
  return (
    <Tabs.Navigator initialRouteName='Entrées' backBehavior='initialRoute' tabBarOptions={{scrollEnabled: true, pressColor: 'darkgrey'}}>
      <Tabs.Screen name='Entrées'>
        {props => <OrderDishes {...props} type='appetizer' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Plats'>
        {props => <OrderDishes {...props} type='mainDish' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Desserts'>
        {props => <OrderDishes {...props} type='dessert' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Boissons'>
        {props => <OrderDishes {...props} type='drink' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Alcools'>
        {props => <OrderDishes {...props} type='alcohol' order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
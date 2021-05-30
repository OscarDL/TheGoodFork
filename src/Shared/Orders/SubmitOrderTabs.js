import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { colors } from '../colors';
import OrderDishes from './OrderDishes';


const Tabs = createMaterialTopTabNavigator();
const style = {
  scrollEnabled: true,
  pressColor: 'darkgrey',
  activeTintColor: colors.accentPrimary,
  labelStyle: {fontSize: 14, fontWeight: 'bold'},
  indicatorStyle: {backgroundColor: colors.accentSecondary}
};


export default function SubmitOrderTabs({oldOrder, order, setOrder, setPrice}) {
  return (
    <Tabs.Navigator
      tabBarOptions={style}
      initialRouteName='Entrées'
      backBehavior='initialRoute'
    >
      <Tabs.Screen name='Entrées'>
        {props => <OrderDishes {...props} type='appetizer' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Plats'>
        {props => <OrderDishes {...props} type='mainDish' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Desserts'>
        {props => <OrderDishes {...props} type='dessert' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Boissons'>
        {props => <OrderDishes {...props} type='drink' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Alcools'>
        {props => <OrderDishes {...props} type='alcohol' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}/>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
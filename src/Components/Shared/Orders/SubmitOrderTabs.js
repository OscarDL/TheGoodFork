import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import OrderDishes from './OrderDishes';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getDishes } from '../../../Functions/dishes';


const Tabs = createMaterialTopTabNavigator();

const style = {
  scrollEnabled: true,
  pressColor: 'darkgrey',
  activeTintColor: colors.accentPrimary,
  labelStyle: {fontSize: 14, fontWeight: 'bold'},
  indicatorStyle: {backgroundColor: colors.accentSecondary}
};

const failureAlert = (error, navigation, setRetry) => {
  const actions = [
    {
      text: 'Réessayer',
      onPress: () => setRetry(true)
    }, {
      text: 'Annuler',
      style: 'cancel',
      onPress: () => navigation.goBack()
    }
  ];

  Alert.alert(
    "Erreur d'affichage des plats", error,
    Platform.OS === 'ios' ? actions : actions.reverse()
  );
};


export default function SubmitOrderTabs({navigation, oldOrder, order, setOrder, setPrice}) {
  const [retry, setRetry] = useState(true);
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    retry && getDishes().then(res => {
      res.success ? setDishes(res.dishes) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [retry, setRetry]);


  return dishes ? (
    <Tabs.Navigator
      tabBarOptions={style}
      initialRouteName='Entrées'
      backBehavior='initialRoute'
    >
      <Tabs.Screen name='Entrées'>
        {props => <OrderDishes {...props} dishes={dishes.filter(dish => dish.type === 'appetizer')}
          type='appetizer' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}
        />}
      </Tabs.Screen>
      <Tabs.Screen name='Plats'>
        {props => <OrderDishes {...props} dishes={dishes.filter(dish => dish.type === 'mainDish')}
          type='mainDish' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}
        />}
      </Tabs.Screen>
      <Tabs.Screen name='Desserts'>
        {props => <OrderDishes {...props} dishes={dishes.filter(dish => dish.type === 'dessert')}
          type='dessert' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}
        />}
      </Tabs.Screen>
      <Tabs.Screen name='Boissons'>
        {props => <OrderDishes {...props} dishes={dishes.filter(dish => dish.type === 'drink')}
          type='drink' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}
        />}
      </Tabs.Screen>
      <Tabs.Screen name='Alcools'>
        {props => <OrderDishes {...props} dishes={dishes.filter(dish => dish.type === 'alcohol')}
          type='alcohol' oldOrder={oldOrder} order={order} setOrder={setOrder} setPrice={setPrice}
        />}
      </Tabs.Screen>
    </Tabs.Navigator>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={60} color={colors.accentPrimary}/>
    </View>
  );
}
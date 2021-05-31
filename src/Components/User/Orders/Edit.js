import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View, Text, SafeAreaView, Platform } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getOrder } from '../../../Functions/orders';
import { truncPrice } from '../../../Functions/utils';
import { useAuthContext } from '../../../Context/Auth/Provider';
import SubmitOrderTabs from '../../../Shared/Components/Orders/SubmitOrderTabs';


export default function UserEditOrder({navigation, route}) {
  const [{token}] = useAuthContext();

  const [newOrder, setNewOrder] = useState(null);
  const [price, setPrice] = useState(route.params.order.price);
  
  useEffect(() => {
    getOrder(route.params.order._id, token).then(res => {
      setNewOrder(res.success ? res.order : route.params.order);
      setPrice(res.success ? res.order.price : route.params.order.price);
    });
    // Better - else for some reason the original order would get mutated
    // when using the newOrder state with the order prop as default value
  }, [setNewOrder, setPrice]);

  
  return newOrder ? <>
    <SubmitOrderTabs oldOrder={route.params.order} order={newOrder} setOrder={setNewOrder} setPrice={setPrice}/>

    <SafeAreaView style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total : {truncPrice(price)} EUR</Text>
      <Button title='Confirmer' disabled={!price} buttonStyle={[styles.button]} 
      onPress={() => navigation.navigate('UserSubmitOrder', {order: newOrder, type: 'edit'})}/>
    </SafeAreaView>
  </> : <View style={styles.container}>
    <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
  </View>
};
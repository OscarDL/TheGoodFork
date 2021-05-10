import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View, Text, SafeAreaView, Platform } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import { getOrder } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';
import SubmitOrderTabs from '../../../Reusables/Orders/SubmitOrderTabs';


export default function WaiterEditOrder({navigation, route}) {
  const [{token}, _] = useDataLayerValue();

  const [newOrder, setNewOrder] = useState(null);
  const [price, setPrice] = useState(route.params.order.price);
  
  useEffect(() => {
    getOrder(route.params.order._id, token).then(res => {
      setNewOrder(res.success ? res.order : route.params.order);
      setPrice(res.success ? res.order.price : route.params.order.price);
    });
    // Necessary, else for some reason the original order would get mutated
    // when using the newOrder state with the order prop as default value
  }, [setNewOrder, setPrice]);


  return newOrder ? <>
    <SubmitOrderTabs order={newOrder} setOrder={setNewOrder} setPrice={setPrice}/>

    <SafeAreaView style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total : {price} EUR</Text>
      <Button title='Confirmer' buttonStyle={[styles.button]} 
      onPress={() => navigation.navigate('WaiterSubmitOrder', {order: newOrder, type: 'edit'})}/>
    </SafeAreaView>
  </> : <View style={styles.container}>
    <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color='#805a48'/>
  </View>
};
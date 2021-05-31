import { Button } from 'react-native-elements';
import { Text, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

import { styles } from '../../../Shared/styles';
import { getOrder } from '../../../Functions/orders';
import { truncPrice } from '../../../Functions/utils';
import SubmitOrderTabs from '../../../Shared/Components/Orders/SubmitOrderTabs';


export default function UserEditOrder({navigation, route}) {
  const [order, setOrder] = useState(null);
  const [price, setPrice] = useState(null);
  
  useEffect(() => {
    getOrder(route.params.order._id).then(res => {
      setOrder(res.success ? res.order : route.params.order);
      setPrice(res.success ? res.order.price : route.params.order.price);
    });
    // Better -> else for some reason the original order would get mutated
    // when using the new order state with the order prop as default value
  }, [setOrder, setPrice]);

  
  return (order && price) ? <>
    <SubmitOrderTabs oldOrder={route.params.order} order={order} setOrder={setOrder} setPrice={setPrice}/>

    <SafeAreaView style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total : {truncPrice(price)} EUR</Text>
      <Button title='Confirmer' disabled={!price} buttonStyle={[styles.button]} 
      onPress={() => navigation.navigate('UserSubmitOrder', {order, type: 'edit'})}/>
    </SafeAreaView>
  </> : null
};
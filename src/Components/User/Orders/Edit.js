import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';

import Text from '../../Shared/Text';
import { styles } from '../../../Shared/styles';
import { getOrder } from '../../../Functions/orders';
import { truncPrice } from '../../../Functions/utils';
import SubmitOrderTabs from '../../Shared/Orders/SubmitOrderTabs';


export default function UserEditOrder({navigation, route}) {
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState(null);
  
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
      <Button title='Continuer' disabled={!price} buttonStyle={[styles.button]} 
      onPress={() => navigation.navigate('UserSubmitOrder', {order, type: 'edit'})}/>
    </SafeAreaView>
  </> : null
};
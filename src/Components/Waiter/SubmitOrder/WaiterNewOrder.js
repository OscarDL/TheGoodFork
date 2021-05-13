import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { SafeAreaView, Text } from 'react-native';

import { styles } from '../../../Shared/styles';
import SubmitOrderTabs from '../../../Shared/Orders/SubmitOrderTabs';


export default function WaiterNewOrder({navigation}) {
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState({
    user: {
      firstName: '',
      lastName: '',
      email: '',
      type: 'waiter'
    },
    appetizer: [],
    mainDish: [],
    dessert: [],
    drink: [],
    alcohol: [],
    price: 0,
    type: {takeaway: false} // For now, waiters only have to place orders for customers on site
  });

  return <>
    <SubmitOrderTabs order={order} setOrder={setOrder} setPrice={setPrice}/>

    <SafeAreaView style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total : {price} EUR</Text>
      <Button title='Confirmer' buttonStyle={[styles.button]}
      onPress={() => navigation.navigate('WaiterSubmitOrder', {order, type: 'submit'})}/>
    </SafeAreaView>
  </>
}
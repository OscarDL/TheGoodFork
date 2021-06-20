import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';

import Text from '../../Shared/Text';
import { styles } from '../../../Shared/styles';
import { truncPrice } from '../../../Functions/utils';
import SubmitOrderTabs from '../../Shared/Orders/SubmitOrderTabs';


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
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total : {truncPrice(price)} EUR</Text>
      <Button title='Continuer' disabled={!price} buttonStyle={[styles.button]}
      onPress={() => navigation.navigate('WaiterSubmitOrder', {order, type: 'submit'})}/>
    </SafeAreaView>
  </>
}
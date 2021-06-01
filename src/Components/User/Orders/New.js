import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { SafeAreaView, Text } from 'react-native';

import { styles } from '../../../Shared/styles';
import { truncPrice } from '../../../Functions/utils';
import SubmitOrderTabs from '../../../Shared/Components/Orders/SubmitOrderTabs';


export default function UserNewOrder({navigation, route}) {
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState({
    appetizer: [],
    mainDish: [],
    dessert: [],
    drink: [],
    alcohol: [],
    price: 0, tip: 0,
    type: route.params.type
  });

  
  return <>
    <SubmitOrderTabs order={order} setOrder={setOrder} setPrice={setPrice}/>

    <SafeAreaView style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total : {truncPrice(price)} EUR</Text>
      <Button title='Continuer' disabled={!price} buttonStyle={[styles.button]}
      onPress={() => navigation.navigate('UserSubmitOrder', {order, type: 'submit'})}/>
    </SafeAreaView>
  </>
}
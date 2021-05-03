import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { SafeAreaView, Text } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import SubmitOrderTabs from '../../../Reusables/Orders/SubmitOrderTabs';


export default function UserNewOrder({navigation, route}) {
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState({
    appetizer: [],
    mainDish: [],
    dessert: [],
    drink: [],
    alcohol: [],
    price: 0,
    type: route.params.type
  });

  return <>
    <SubmitOrderTabs order={order} setOrder={setOrder} setPrice={setPrice}/>

    <SafeAreaView style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total : {price}</Text>
      <Button title='Confirmer' buttonStyle={[styles.button]}
      onPress={() => navigation.navigate('UserSubmitOrder', {order, type: 'submit'})}/>
    </SafeAreaView>
  </>
}
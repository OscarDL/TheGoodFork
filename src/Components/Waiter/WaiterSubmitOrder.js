import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';


const submitOrder = async (token, order, navigation) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const {data} = await axios.post('http://192.168.1.111:9000/api/orders/create', order, config);

    if (data?.success) {
      Alert.alert(
        "Order successful",
        "Your order was submitted successfully.",
        [{
          text: 'DONE',
          onPress: () => navigation.goBack()
        }]
      );
      
    } else {
      Alert.alert(
        "Couldn't submit order.",
        data?.error,
        [{ text: 'RETRY' }]
      );
    }
    
  } catch (error) {
    Alert.alert(
      "Couldn't submit order",
      error.response.data.error,
      [{ text: 'RETRY' }]
    );
  }
};


export default function WaiterSubmitOrder({navigation}) {
  const [{token}, _] = useDataLayerValue();

  const [order, setOrder] = useState({
    user: {email: '', type: 'waiter'},
    orderContent: {
      appetizer: [],
      mainDish: [],
      dessert: []
    },
    price: 0,
    currency: 'EUR',
  });

  const [appetizer, setAppetizer] = useState('');
  const [mainDish, setMainDish] = useState('');
  const [dessert, setDessert] = useState('');


  const appendOrder = (item, type) => {
    const newOrder = order.orderContent;

    type === 'appetizer' && newOrder.appetizer.push(item);
    type === 'mainDish' && newOrder.mainDish.push(item);
    type === 'dessert' && newOrder.dessert.push(item);

    setOrder({...order, orderContent: newOrder});
  }


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <Text style={{...styles.roboto, textAlign: 'center'}}>
        Place an order for a customer here.
      </Text>
      
      <View>
        <Input style={styles.roboto} placeholder="Customer's email" onChangeText={user => setOrder({ ...order, user: {email: user, type: 'waiter'} })} />
        <Input style={styles.roboto} placeholder='Price' onChangeText={price => setOrder({ ...order, price })} />
        <Input style={styles.roboto} placeholder='Currency' onChangeText={currency => setOrder({ ...order, currency })} />
        
        <View style={{alignItems: 'center'}}>
          <Input style={styles.roboto} placeholder='Appetizer' onChangeText={appetizer => setAppetizer(appetizer)}/>
          <Button buttonStyle={[styles.button]} title='Add' onPress={() => appendOrder(appetizer, 'appetizer')}/>
        </View>
        <View style={{alignItems: 'center'}}>
          <Input style={styles.roboto} placeholder='Main dish' onChangeText={mainDish => setMainDish(mainDish)}/>
          <Button buttonStyle={[styles.button]} title='Add' onPress={() => appendOrder(mainDish, 'mainDish')}/>
        </View>
        <View style={{alignItems: 'center'}}>
          <Input style={styles.roboto} placeholder='Dessert' onChangeText={dessert => setDessert(dessert)}/>
          <Button buttonStyle={[styles.button]} title='Add' onPress={() => appendOrder(dessert, 'dessert')}/>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Register'
          icon={<Icon
            size={28}
            color='white'
            type='material'
            name='how-to-reg'
            style={{marginRight: 10}}
          />}
          onPress={() => submitOrder(token, order, navigation)}
        />
      </View>
    </View>
  );
}
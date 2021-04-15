import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import UserSubmitOrder from './UserSubmitOrder';
import { styles } from '../../../Reusables/Styles';
import { totalPrice } from '../../../Functions/orders';
import SubmitOrderTabs from '../../../Reusables/Orders/SubmitOrderTabs';


const Stack = createStackNavigator();

export default UserEditOrder = ({title, route}) => (
  <Stack.Navigator initialRouteName='UserEditOrderComponent'>
    <Stack.Screen name='UserEditOrderComponent' options={{title}}>
      {props => <UserEditOrderComponent {...props} order={route.params.order}/>}
    </Stack.Screen>
    <Stack.Screen name='UserSubmitOrder' component={UserSubmitOrder} options={{title: 'Verify & Submit', cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}}/>
  </Stack.Navigator>
);


function UserEditOrderComponent({navigation, order}) {
  const [price, setPrice] = useState(totalPrice(order));
  const [newOrder, setNewOrder] = useState({...order,
    appetizer: order.appetizer || [],
    mainDish: order.mainDish || [],
    dessert: order.dessert || [],
    drink: order.drink || [],
    alcohol: order.alcohol || []
  });

  return <>
    <SubmitOrderTabs order={newOrder} setOrder={setNewOrder} setPrice={setPrice}/>

    <View style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total: {price}</Text>
      <Button title='Confirm edit' buttonStyle={[styles.button]} 
      onPress={() => navigation.navigate('UserSubmitOrder', {order: newOrder, type: 'edit'})}/>
    </View>
  </>
};
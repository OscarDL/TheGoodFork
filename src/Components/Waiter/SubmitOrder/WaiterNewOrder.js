import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { styles } from '../../../Reusables/Styles';
import WaiterSubmitOrder from './WaiterSubmitOrder';
import SubmitOrderTabs from '../../../Reusables/Orders/SubmitOrderTabs';


const Stack = createStackNavigator();

export default WaiterNewOrder = () => (
  <Stack.Navigator initialRouteName='UserNewOrderComponent'>
    <Stack.Screen name='WaiterNewOrderComponent' component={WaiterNewOrderComponent} options={{title: 'New customer order'}}/>
    <Stack.Screen name='WaiterSubmitOrder' component={WaiterSubmitOrder} options={{title: 'Verify & Submit', cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}}/>
  </Stack.Navigator>
);

function WaiterNewOrderComponent({navigation}) {
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
    price: 0
  });

  return <>
    <SubmitOrderTabs order={order} setOrder={setOrder} setPrice={setPrice}/>

    <View style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total: {price}</Text>
      <Button buttonStyle={[styles.button]} onPress={() => navigation.navigate('WaiterSubmitOrder', {order})} title='Place order'/>
    </View>
  </>
}
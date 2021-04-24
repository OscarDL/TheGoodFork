import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import UserSubmitOrder from './UserSubmitOrder';
import { styles } from '../../../Reusables/Styles';
import SubmitOrderTabs from '../../../Reusables/Orders/SubmitOrderTabs';


const Stack = createStackNavigator();

export default UserNewOrder = ({title, route}) => (
  <Stack.Navigator initialRouteName='UserNewOrderComponent'>
    <Stack.Screen name='UserNewOrderComponent' options={{title}}>
      {props => <UserNewOrderComponent {...props} takeaway={route.params.takeaway} />}
    </Stack.Screen>
    <Stack.Screen name='UserSubmitOrder' component={UserSubmitOrder} options={{title: 'Verify & Submit', cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}}/>
  </Stack.Navigator>
);

function UserNewOrderComponent({navigation, takeaway}) {
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState({
    appetizer: [],
    mainDish: [],
    dessert: [],
    drink: [],
    alcohol: [],
    price: 0,
    takeaway
  });

  return <>
    <SubmitOrderTabs order={order} setOrder={setOrder} setPrice={setPrice}/>

    <View style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total: {price}</Text>
      <Button buttonStyle={[styles.button]} onPress={() => navigation.navigate('UserSubmitOrder', {order, type: 'submit'})} title='Place order'/>
    </View>
  </>
}
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import UserSubmitOrder from './UserSubmitOrder';
import { styles } from '../../../Reusables/Styles';
import { getOrder } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';
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
  const [price, setPrice] = useState(0);
  const [newOrder, setNewOrder] = useState(null);
  
  const [{token}, _] = useDataLayerValue();

  useEffect(() => {
    getOrder(order._id, token).then(res => {setNewOrder(res.order); setPrice(res.order.price)});
    // Necessary, else for some reason the original order would get mutated when using newOrder state with order prop as default value
  }, [setNewOrder, setPrice]);

  return <>
    {newOrder && <SubmitOrderTabs order={newOrder} setOrder={setNewOrder} setPrice={setPrice}/>}

    {newOrder && <View style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total: {price}</Text>
      <Button title='Confirm edit' buttonStyle={[styles.button]} 
      onPress={() => navigation.navigate('UserSubmitOrder', {order: newOrder, type: 'edit'})}/>
    </View>}
  </>
};
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import WaiterSubmitOrder from './WaiterSubmitOrder';
import { styles } from '../../../Reusables/Styles';
//import { getOrder } from '../../../Functions/orders';
//import { useDataLayerValue } from '../../Context/DataLayer';
import SubmitOrderTabs from '../../../Reusables/Orders/SubmitOrderTabs';


const Stack = createStackNavigator();

export default WaiterEditOrder = ({title, route}) => (
  <Stack.Navigator initialRouteName='WaiterEditOrderComponent'>
    <Stack.Screen name='WaiterEditOrderComponent' options={{title}}>
      {props => <WaiterEditOrderComponent {...props} order={route.params.order}/>}
    </Stack.Screen>
    <Stack.Screen name='WaiterSubmitOrder' component={WaiterSubmitOrder} options={{title: 'Verify & Submit', cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}}/>
  </Stack.Navigator>
);


function WaiterEditOrderComponent({navigation, order}) {
  const [price, setPrice] = useState(order.price);
  const [newOrder, setNewOrder] = useState(order);
  
  /*const [{token}, _] = useDataLayerValue();

  useEffect(() => {
    getOrder(order._id, token).then(res => {setNewOrder(res.order); setPrice(res.order.price)});
    // Necessary, else for some reason the original order would get mutated when using newOrder state with order prop as default value
  }, [setNewOrder, setPrice]);*/

  return <>
    <SubmitOrderTabs order={newOrder} setOrder={setNewOrder} setPrice={setPrice}/>

    <View style={styles.orderStrip}>
      <Text style={{fontSize: 16, fontWeight: '600'}}>Total: {price}</Text>
      <Button title='Confirm edit' buttonStyle={[styles.button]} 
      onPress={() => navigation.navigate('WaiterSubmitOrder', {order: newOrder, type: 'edit'})}/>
    </View>
  </>
};
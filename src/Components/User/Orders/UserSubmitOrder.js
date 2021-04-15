import React from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { View, ScrollView, Text } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import OrderDetails from '../../../Reusables/Orders/OrderDetails';
import { editOrder, submitOrder } from '../../../Functions/orders';
import { useDataLayerValue } from '../../../Components/Context/DataLayer';


const handleEdit = (order, token, navigation) => {
  editOrder(order, token).then(res => {
    res.success && navigation.goBack();
    Alert.alert(
      res.success ? res.title : "Could not submit order",
      res.success ? res.desc : res,
      [{
        text: res.success ? "DONE" : "OK",
        onPress: () => res.success ? navigation.navigate('UserOrderDetails', {order}) : (order.price === 0 ? navigation.goBack() : null)
      }]
    );
  });
};
  
const handleSubmit = (order, user, token, navigation) => {
  submitOrder({...order, user}, token).then(res => {
    res.success && navigation.goBack();
    Alert.alert(
      res.success ? res.title : "Could not submit order",
      res.success ? res.desc : res,
      [{
        text: res.success ? "DONE" : "OK",
        onPress: () => res.success || order.price === 0 ? navigation.goBack() : null
      }]
    );
  });
};

  
export default function UserSubmitOrder({navigation, route}) {
  const {order, type} = route.params;
  const [{user, token}, _] = useDataLayerValue();

  return (
    <View style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <OrderDetails order={order}/>
      </ScrollView>
      <View style={{padding: 5}}>
        <Button title='Submit order' buttonStyle={[styles.button]}
        onPress={() => type === 'edit' ? handleEdit(order, token, navigation) : handleSubmit(order, user, token, navigation)} />
      </View>
    </View>
  );
}
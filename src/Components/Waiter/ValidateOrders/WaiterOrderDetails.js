import React, { useState, useEffect } from 'react';
import { FAB } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import OrderDetails from '../../../Reusables/Orders/OrderDetails';
import { deleteOrder, getOrder, validateOrder } from '../../../Functions/orders';


const handleValidate = (order, token, navigation) => {
  validateOrder(order, token).then(res => Alert.alert(
    res.success ? res.title : "Could not validate order",
    res.success ? res.desc : res,
    [{
      text: res.success ? "DONE" : "RETRY",
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
}

const handleDelete = (order, token, navigation) => {
  Alert.alert(
    "Are you sure?",
    `You're about to delete this order.`,
    [
      { text: 'CANCEL' },
      { text: 'CONTINUE',
        onPress: () => deleteOrder(order, token).then(res => Alert.alert(
          res.success ? res.title : "Could not delete order",
          res.success ? res.desc : res,
          [{
            text: res.success ? "DONE" : "RETRY",
            onPress: () => res.success ? navigation.goBack() : null
          }]
        ))
      }
    ]
  );
}


export default function WaiterOrderDetails({navigation, route}) {
  const {order, readOnly} = route.params.params;

  const isFocused = useIsFocused();
  const [{token}, _] = useDataLayerValue();
  const [updatedOrder, setUpdatedOrder] = useState(order);

  useEffect(() => {
    navigation.setOptions({title: `${(updatedOrder.takeaway ? 'À emporter' : 'Sur place')} : ${updatedOrder.user.firstName} ${updatedOrder.user.lastName}`});
  }, []);

  useEffect(() => {
    isFocused && getOrder(order._id, token).then(res => setUpdatedOrder(res.order));
  }, [isFocused, setUpdatedOrder]);
  
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <OrderDetails order={updatedOrder}/>
        <View style={{alignItems: 'center', margin: 20}}>
          {readOnly
            ?
          <Text style={{...styles.roboto, fontSize: 16, textTransform: 'capitalize'}}>status: {updatedOrder.status}</Text>
            :
          <TouchableOpacity style={{padding: 10}} onPress={() => handleDelete(updatedOrder, token, navigation)}>
            <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Delete this order</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
      <FAB style={styles.fab} icon={readOnly ? 'pencil' : 'check'} color='white'
        onPress={() => readOnly ? navigation.navigate('WaiterEditOrder', {order: updatedOrder}) : handleValidate(updatedOrder, token, navigation)}
      />
    </View>
  );
}
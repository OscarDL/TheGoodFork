import React from 'react';
import { FAB } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import OrderDetails from '../../../Reusables/Orders/OrderDetails';
import { deleteOrder, validateOrder } from '../../../Functions/orders';


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
  const [{token}, _] = useDataLayerValue();
  
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <OrderDetails order={order}/>

        <Text style={{...styles.title, textAlign: 'center', marginVertical: 10}}>Total: {order.price} {order.currency}</Text>

        <View style={{alignItems: 'center', margin: 10, marginBottom: 20}}>
          {readOnly
            ?
            <Text style={{...styles.roboto, fontSize: 16, textTransform: 'capitalize'}}>status: {order.status}</Text>
            :
          <TouchableOpacity style={{padding: 10}} onPress={() => handleDelete(order, token, navigation)}>
            <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Delete this order</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
      {!readOnly && <FAB style={styles.fab} icon='check' color='white' onPress={() => handleValidate(order, token, navigation)}/>}
    </View>
  );
}
import React from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { View, ScrollView, Text } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import { submitOrder } from '../../../Functions/orders';
import OrderDetails from '../../../Reusables/Orders/OrderDetails';
import { useDataLayerValue } from '../../../Components/Context/DataLayer';


const handleSubmit = (order, user, token, navigation) => {
  navigation.goBack();
  submitOrder({...order, user}, token).then(res => Alert.alert(
    res.success ? res.title : "Could not submit order",
    res.success ? res.desc : res,
    [{
      text: res.success ? "DONE" : "OK",
      onPress: () => res.success || order.price === 0 ? navigation.goBack() : null
    }]
  ));
};


export default function UserSubmitOrder({navigation, route}) {
  const {order} = route.params;
  const [{user, token}, _] = useDataLayerValue();

  return (
    <View style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <OrderDetails order={order}/>
        <Text style={{...styles.title, textAlign: 'center', marginVertical: 10}}>Total: {order.price} €</Text>
      </ScrollView>
      <View style={{padding: 5}}>
        <Button title='Submit order' buttonStyle={[styles.button]} onPress={() => handleSubmit(order, user, token, navigation)} />
      </View>
    </View>
  );
}
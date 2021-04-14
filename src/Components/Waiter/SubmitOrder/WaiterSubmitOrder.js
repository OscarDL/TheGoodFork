import { Alert } from 'react-native';
import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { View, ScrollView, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { submitOrder } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';
import OrderDetails from '../../../Reusables/Orders/OrderDetails';


const sectionTitle = {
  flex: 1,
  marginVertical: 10,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between'
};
const sectionText = {
  flexGrow: 1,
  fontSize: 20,
  textAlign: 'center'
};

const handleSubmit = (order, user, token, navigation) => {
  submitOrder({...order, user}, token).then(res => {
    res.success && navigation.goBack();
    Alert.alert(
      res.success ? res.title : "Could not submit order",
      res.success ? res.desc : res.error,
      [{
        text: res.success ? "DONE" : "OK",
        onPress: () => res.success || order.price === 0 ? navigation.goBack() : null
      }]
    );
  });
};


export default function WaiterSubmitOrder({navigation, route}) {
  const {order} = route.params;
  const [{token}, _] = useDataLayerValue();

  const [details, setDetails] = useState(false);
  const [customer, setCustomer] = useState(true);

  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
    type: 'waiter'
  })

  return (
    <View style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <TouchableOpacity style={sectionTitle} onPress={() => setCustomer(!customer)}>
            <Icon style={{opacity: 0 /* Center title */}}  name={'expand-less'}/>
            <Text style={sectionText}>Customer details</Text>
            <Icon name={customer ? 'expand-less' : 'expand-more'}/>
        </TouchableOpacity>

        <Collapsible collapsed={!customer}>
          <Input placeholder='First name' onChangeText={firstName => setUser({ ...user, firstName })} />
          <Input placeholder='Last name' onChangeText={lastName => setUser({ ...user, lastName })} />
          <Input placeholder='Email address' autoCapitalize='none' onChangeText={email => setUser({ ...user, email })} />
        </Collapsible>

        <TouchableOpacity style={sectionTitle} onPress={() => setDetails(!details)}>
            <Icon style={{opacity: 0} /* Center title */} name={'expand-less'}/>
            <Text style={sectionText}>Order details</Text>
            <Icon name={details ? 'expand-less' : 'expand-more'}/>
        </TouchableOpacity>

        <Collapsible collapsed={!details}>
          <OrderDetails order={order}/>
          <Text style={{...styles.title, textAlign: 'center', marginVertical: 10}}>Total: {order.price} €</Text>
        </Collapsible>
      </ScrollView>

      <View style={{padding: 5}}>
        <Button title='Submit order' buttonStyle={[styles.button]} onPress={() => handleSubmit(order, user, token, navigation)} />
      </View>
    </View>
  );
}
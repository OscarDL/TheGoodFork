import { Alert } from 'react-native';
import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { Button, Input, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, ScrollView, Text, TextInput } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import OrderDetails from '../../../Reusables/Orders/OrderDetails';
import { submitOrder, editOrder } from '../../../Functions/orders';


const handleEdit = (order, customer, token, navigation) => {
  editOrder({...order, user: customer}, token).then(res => {
    res.success && navigation.goBack();
    Alert.alert(
      res.success ? res.title : "Could not edit order",
      res.success ? res.desc : res,
      [{
        text: res.success ? "DONE" : "OK",
        onPress: () => res.success ? navigation.navigate('WaiterOrderDetails', {order}) : (order.price === 0 ? navigation.goBack() : null)
      }]
    );
  });
};

const handleSubmit = (order, customer, token, navigation, user) => {
  submitOrder({...order, user: customer}, token, user.email).then(res => {
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


export default function WaiterSubmitOrder({navigation, route}) {
  const {order, type} = route.params;
  const [{token, user}, _] = useDataLayerValue();

  const [details, setDetails] = useState(null);
  const [collapsed, setCollapsed] = useState({order: true, customer: false});

  const [customer, setCustomer] = useState({
    firstName: type !== 'edit' ? null : order.user.firstName,
    lastName: type !== 'edit' ? null : order.user.lastName,
    email: type !== 'edit' ? null : order.user.email,
    type: type !== 'edit' ? 'waiter' : order.user.type
  });

  return (
    <View style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <View style={{marginTop: 6}}>
          <Text style={styles.title}>Détails supplémentaires</Text>
          <TextInput placeholder='Give extra information for your order...' onChangeText={setDetails} multiline
          defaultValue={order.details} style={{margin: 10, padding: 10, borderRadius: 5, backgroundColor: 'white'}} />
        </View>
        
        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed({...collapsed, customer: !collapsed.customer})}>
            <Icon style={{opacity: 0, paddingHorizontal: 10 /* Center title */}}  name={'expand-less'}/>
            <Text style={styles.sectionText}>Customer details</Text>
            <Icon style={{paddingHorizontal: 10}} name={collapsed.customer ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed.customer}>
          <Input placeholder='First name' defaultValue={order?.user?.firstName} onChangeText={firstName => setCustomer({ ...customer, firstName })} />
          <Input placeholder='Last name' defaultValue={order?.user?.lastName} onChangeText={lastName => setCustomer({ ...customer, lastName })} />
          <Input placeholder='Email address' defaultValue={order?.user?.email} autoCapitalize='none' onChangeText={email => setCustomer({ ...customer, email })} />
        </Collapsible>

        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed({...collapsed, order: !collapsed.order})}>
            <Icon style={{opacity: 0, paddingHorizontal: 10} /* Center title */} name={'expand-less'}/>
            <Text style={styles.sectionText}>Order details</Text>
            <Icon style={{paddingHorizontal: 10}} name={collapsed.order ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed.order}>
          <OrderDetails order={order} hideDetails={true}/>
        </Collapsible>
      </ScrollView>

      <View style={{padding: 5}}>
        <Button title='Submit order' buttonStyle={[styles.button]}
          onPress={() => type === 'edit' ? handleEdit({...order, details}, customer, token, navigation)
          : handleSubmit({...order, details}, customer, token, navigation, user)}
        />
      </View>
    </View>
  );
}
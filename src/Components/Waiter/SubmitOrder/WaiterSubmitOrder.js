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


export default function WaiterSubmitOrder({navigation, route}) {
  const {order} = route.params;
  const [{token}, _] = useDataLayerValue();

  const [details, setDetails] = useState(null);
  const [collapsed, setCollapsed] = useState({order: true, customer: false});

  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
    type: 'waiter'
  });

  return (
    <View style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <View style={{marginTop: 6}}>
          <Text style={styles.title}>Détails supplémentaires</Text>
          <TextInput placeholder='Give extra information for your order...' onChangeText={setDetails} multiline
          value={order.details} style={{margin: 10, padding: 10, borderRadius: 5, backgroundColor: 'white'}} />
        </View>
        
        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed({...collapsed, customer: !collapsed.customer})}>
            <Icon style={{opacity: 0, paddingHorizontal: 10 /* Center title */}}  name={'expand-less'}/>
            <Text style={styles.sectionText}>Customer details</Text>
            <Icon style={{paddingHorizontal: 10}} name={collapsed.customer ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed.customer}>
          <Input placeholder='First name' onChangeText={firstName => setUser({ ...user, firstName })} />
          <Input placeholder='Last name' onChangeText={lastName => setUser({ ...user, lastName })} />
          <Input placeholder='Email address' autoCapitalize='none' onChangeText={email => setUser({ ...user, email })} />
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
        <Button title='Submit order' buttonStyle={[styles.button]} onPress={() => handleSubmit({...order, details}, user, token, navigation)} />
      </View>
    </View>
  );
}
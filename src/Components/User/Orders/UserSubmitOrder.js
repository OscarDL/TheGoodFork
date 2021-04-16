import React, { useState } from 'react';
import { Alert , TextInput } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button, Icon } from 'react-native-elements';
import { View, ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  
  const [details, setDetails] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <View style={{marginTop: 6}}>
          <Text style={styles.title}>Détails supplémentaires</Text>
          <TextInput placeholder='Give extra information for your order...' defaultValue={order.details} multiline
          onChangeText={setDetails} style={{margin: 10, padding: 10, borderRadius: 5, backgroundColor: 'white'}}/>
        </View>
        
        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed(!collapsed)}>
            <Icon style={{opacity: 0, paddingHorizontal: 10} /* Center title */} name={'expand-less'}/>
            <Text style={styles.sectionText}>Order details</Text>
            <Icon style={{paddingHorizontal: 10}} name={collapsed ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed}>
          <OrderDetails order={order} hideDetails={true}/>
        </Collapsible>
      </ScrollView>

      <View style={{padding: 5}}>
        <Button title='Submit order' buttonStyle={[styles.button]}
        onPress={() => type === 'edit' ? handleEdit({...order, details}, token, navigation) : handleSubmit({...order, details}, user, token, navigation)} />
      </View>
    </View>
  );
}
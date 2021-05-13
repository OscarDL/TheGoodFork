import { Alert , TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { Button, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';

import { styles } from '../../../Shared/styles';
import OrderDetails from '../../../Shared/Orders/OrderDetails';
import { editOrder, submitOrder } from '../../../Functions/orders';
import { useDataLayerValue } from '../../../Components/Context/DataLayer';


const handleEdit = (order, token, navigation) => {
  editOrder(order, token).then(res => {
    res.success && navigation.goBack();
    Alert.alert(
      res.success ? res.title : 'Erreur lors de la modification',
      res.success ? res.desc : res,
      [{
        text: res.success ? 'Terminé' : 'Compris',
        onPress: () => res.success ? navigation.navigate('UserOrderDetails', {order}) : (order.price === 0 ? navigation.goBack() : null)
      }]
    );
  });
};
  
const handleSubmit = (order, user, token, navigation) => {
  submitOrder({...order, user}, token, user.email).then(res => {
    res.success && navigation.goBack();
    Alert.alert(
      res.success ? res.title : 'Erreur lors de la commande',
      res.success ? res.desc : res,
      [{
        text: res.success ? 'Terminé' : 'Compris',
        onPress: () => res.success || order.price === 0 ? navigation.goBack() : null
      }]
    );
  });
};
  
export default function UserSubmitOrder({navigation, route}) {
  const {order, type} = route.params;
  const [{user, token}, _] = useDataLayerValue();
  
  const [collapsed, setCollapsed] = useState(true);
  const [details, setDetails] = useState(order.details);

  useEffect(() => {
    navigation.setOptions({title: 'Commande ' + (!order.takeaway ? 'sur place' : 'à emporter')})
  }, []);


  return (
    <SafeAreaView style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <View style={{marginTop: 6}}>
          <Text numberOfLines={1} style={styles.title}>Détails supplémentaires</Text>
          <TextInput placeholder='Ajoutez une précision sur votre commande...' onChangeText={setDetails} multiline
          value={details} style={{margin: 10, padding: 10, paddingTop: 10, borderRadius: 5, backgroundColor: 'white'}}/>
        </View>
        
        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed(!collapsed)}>
            <Icon style={{opacity: 0, paddingHorizontal: 10} /* Center title */} name={'expand-less'}/>
            <Text style={styles.sectionText}>Commande</Text>
            <Icon style={{paddingHorizontal: 10}} name={collapsed ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed}>
          <OrderDetails order={order} hideDetails={true} showPrice={false}/>
        </Collapsible>
      </ScrollView>

      <View style={{padding: 5}}>
        <Text style={{...styles.title, textAlign: 'center', marginVertical: 10}}>
          Total : {order.price} EUR
        </Text>

        <Button title='Commander' buttonStyle={[{...styles.button, margin: 10}]}
        onPress={() => type === 'edit' ? handleEdit({...order, details}, token, navigation) : handleSubmit({...order, details}, user, token, navigation)} />
      </View>
    </SafeAreaView>
  );
}
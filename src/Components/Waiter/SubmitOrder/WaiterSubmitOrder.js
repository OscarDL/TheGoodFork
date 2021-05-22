import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import Collapsible from 'react-native-collapsible';
import { Button, Input, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, ScrollView, Text, TextInput, SafeAreaView } from 'react-native';

import { styles } from '../../../Shared/styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import OrderDetails from '../../../Shared/Orders/OrderDetails';
import { submitOrder, editOrder } from '../../../Functions/orders';


export default function WaiterSubmitOrder({navigation, route}) {
  const {order, type} = route.params;
  const [{token, user}] = useDataLayerValue();

  const [details, setDetails] = useState(order.details);
  const [collapsed, setCollapsed] = useState({customer: false, order: true});

  const [customer, setCustomer] = useState({
    firstName: type !== 'edit' ? null : order.user.firstName,
    lastName: type !== 'edit' ? null : order.user.lastName,
    email: type !== 'edit' ? null : order.user.email,
    type: type !== 'edit' ? 'waiter' : order.user.type
  });


  const handleEdit = () => {
    if (!order.price) return navigation.goBack();

    editOrder({...order, user: customer}, token).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de modification',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });

      if (res.success) navigation.navigate('WaiterOrderDetails', {order});
    });
  };
  
  const handleSubmit = () => {
    if (!order.price) return navigation.goBack();
  
    submitOrder({...order, user: customer}, token, user.email).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de commande',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
  
      if (res.success) return navigation.navigate('WaiterHome');
    });
  };
  
  const handleChoice = () => {
    if (!order.price) {
      return Alert.alert(
        'Erreur de commande',
        'La commande ne peut pas être vide.',
        [{
          text: 'Compris',
          onPress: () => navigation.goBack()
        }]
      );
    }
  
    const actions = [
      {
        text: 'Annuler'
      }, {
        text: 'Plus tard',
        onPress: () => type === 'edit' ? handleEdit() : handleSubmit()
      }, {
        text: 'Payer',
        onPress: () => navigation.navigate('WaiterPayOrder', {order, type})
      }
    ];
    
    Alert.alert(
      'Procédure de paiement',
      "Faire payer la commande au client maintenant ?",
      [
        actions[Platform.OS === 'ios' ? 2 : 0], actions[1], actions[Platform.OS === 'ios' ? 0 : 2]
      ]
    );
  };


  return (
    <SafeAreaView style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <View style={{marginTop: 6}}>
          <Text numberOfLines={1} style={styles.title}>Détails supplémentaires</Text>
          <TextInput placeholder='Ajoutez une précision sur votre commande...' onChangeText={setDetails} multiline
          value={details} style={{margin: 10, padding: 10, paddingTop: 10, borderRadius: 5, backgroundColor: 'white'}} />
        </View>
        
        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed({...collapsed, customer: !collapsed.customer})}>
          <Icon style={{opacity: 0, paddingHorizontal: 10 /* Center title */}}  name={'expand-less'}/>
          <Text style={styles.sectionText}>Infos client</Text>
          <Icon style={{paddingHorizontal: 10}} name={collapsed.customer ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed.customer}>
          <Input placeholder='First name' defaultValue={order?.user?.firstName} onChangeText={firstName => setCustomer({ ...customer, firstName })} />
          <Input placeholder='Last name' defaultValue={order?.user?.lastName} onChangeText={lastName => setCustomer({ ...customer, lastName })} />
          <Input placeholder='Email address' keyboardType='email-address' defaultValue={order?.user?.email} autoCapitalize='none' onChangeText={email => setCustomer({ ...customer, email })} />
        </Collapsible>

        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed({...collapsed, order: !collapsed.order})}>
          <Icon style={{opacity: 0, paddingHorizontal: 10} /* Center title */} name={'expand-less'}/>
          <Text style={styles.sectionText}>Commande</Text>
          <Icon style={{paddingHorizontal: 10}} name={collapsed.order ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed.order}>
          <OrderDetails order={order} hideDetails={true} showPrice={false}/>
        </Collapsible>
      </ScrollView>

      <View style={{padding: 5}}>
        <Text style={{...styles.title, textAlign: 'center', marginVertical: 10}}>
          Total : {order.price} EUR
        </Text>

        <Button
          icon={<Icon
            size={24}
            color='white'
            style={{marginRight: 10, padding: 2}}
            name={type === 'edit' ? 'pencil' : 'shopping-cart'}
          />}
          title='Commander'
          onPress={handleChoice}
          buttonStyle={[{...styles.button, margin: 10}]}
        />
      </View>
    </SafeAreaView>
  );
}
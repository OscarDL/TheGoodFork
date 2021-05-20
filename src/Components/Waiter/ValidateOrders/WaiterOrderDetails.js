import { FAB } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { View, Text, Alert, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Shared/styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import OrderDetails from '../../../Shared/Orders/OrderDetails';
import { cancelOrder, getOrder, validateOrder } from '../../../Functions/orders';


export default function WaiterOrderDetails({navigation, route}) {
  const {order, readOnly} = route.params;

  const isFocused = useIsFocused();
  const [{token}] = useDataLayerValue();
  const [updatedOrder, setUpdatedOrder] = useState(order);

  useEffect(() => {
    navigation.setOptions({title: `${(updatedOrder.takeaway ? 'À emporter' : 'Sur place')} - ${updatedOrder.user.firstName} ${updatedOrder.user.lastName}`});
  }, []);

  useEffect(() => {
    isFocused && getOrder(order._id, token).then(res => setUpdatedOrder(res.order));
  }, [isFocused, setUpdatedOrder]);


  const handleValidate = () => (
    validateOrder(updatedOrder, token).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de validation',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      if (res.success) navigation.goBack();
    })
  );
  
  const handleCancel = () => (
    Alert.alert(
      'Êtes-vous sûr ?',
      "Vous êtes sur le point d'annuler cette commande.",
      [{
        text: 'Revenir'
      },
      {
        text: 'Continuer',
        onPress: () => cancelOrder(updatedOrder, token).then(res => {
          Toast.show({
            text1: res.title ?? "Erreur d'annulation",
            text2: res.desc ?? res,
            
            position: 'bottom',
            visibilityTime: 1500,
            type: res.success ? 'success' : 'error'
          });
          if (res.success) navigation.goBack();
        })
      }]
    )
  );
  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        <OrderDetails order={updatedOrder}/>
        <View style={{alignItems: 'center', margin: 20}}>
          {readOnly
            ?
          <Text style={{fontSize: 16, marginBottom: 15, textTransform: 'capitalize'}}>Statut : {updatedOrder.status}</Text>
            :
          null}          
          <TouchableOpacity style={{padding: 10}} onPress={handleCancel}>
            <Text style={styles.delete}>Supprimer cette commande</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FAB style={styles.fab} icon={readOnly ? 'pencil' : 'check'} label={readOnly ? 'Modifier' : 'Valider'} color='white'
        onPress={() => readOnly ? navigation.navigate('WaiterEditOrder', {order: updatedOrder}) : handleValidate()}
      />
    </SafeAreaView>
  );
}
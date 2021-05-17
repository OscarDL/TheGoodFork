import { FAB } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { View, Text, Alert, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Shared/styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import { getOrder, deleteOrder } from '../../../Functions/orders';
import OrderDetails from '../../../Shared/Orders/OrderDetails';


const handleCancel = (order, token, navigation) => Alert.alert(
  'Êtes-vous sûr ?',
  "Vous êtes sur le point d'annuler votre commande.",
  [{
    text: 'Revenir'
  },
  {
    text: 'Continuer',
    onPress: () => deleteOrder(order, token).then(res => {
      Toast.show({
        text1: res.title ?? "Erreur d'annulation",
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && navigation.goBack();
    })
  }]
);


export default function UserOrderDetails({navigation, route}) {
  const {order} = route.params;
  const [{token}] = useDataLayerValue();

  const isFocused = useIsFocused();
  const [updatedOrder, setUpdatedOrder] = useState(order);
  
  useEffect(() => {
    isFocused && getOrder(order._id, token).then(res => res.success && setUpdatedOrder(res.order));
    navigation.setOptions({title: `${(updatedOrder.takeaway ? 'À emporter' : 'Sur place')}`});
  }, [isFocused]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>

        <OrderDetails order={updatedOrder}/>

        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 16, textTransform: 'capitalize'}}>Statut : {updatedOrder.status}</Text>
          
          {!updatedOrder.validated && !updatedOrder.paid && (
            <TouchableOpacity style={{padding: 10, marginTop: 20}} onPress={() => handleCancel(updatedOrder, token, navigation)}>
              <Text style={styles.delete}>Annuler ma commande</Text>
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>
      {!updatedOrder.validated && !updatedOrder.paid && (
        <FAB style={styles.fab} icon='pencil' label='Modifier' color='white'
        onPress={() => navigation.navigate('UserEditOrder', {order: updatedOrder})}/>
      )}
    </SafeAreaView>
  );
}
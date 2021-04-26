import { FAB } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import { getOrder, deleteOrder } from '../../../Functions/orders';
import OrderDetails from '../../../Reusables/Orders/OrderDetails';


const handleCancel = (order, token, navigation) => Alert.alert(
  'Êtes-vous sûr ?',
  "Vous êtes sur le point d'annuler votre commande.",
  [{
    text: 'Revenir'
  },
  {
    text: 'Continuer',
    onPress: () => deleteOrder(order, token).then(res => Alert.alert(
      res.success ? res.title : "Erreur lors de l'annulation",
      res.success ? res.desc : res,
      [{
        text: res.success ? 'Terminé' : 'Réessayer',
        onPress: () => res.success ? navigation.goBack() : null
      }]
    ))
  }]
);

export default function UserOrderDetails({navigation, route}) {
  const {order} = route.params.params;
  const [{token}, _] = useDataLayerValue();

  const isFocused = useIsFocused();
  const [updatedOrder, setUpdatedOrder] = useState(order);
  
  useEffect(() => {
    isFocused && getOrder(order._id, token).then(res => res.success && setUpdatedOrder(res.order));
    navigation.setOptions({title: `${(updatedOrder.takeaway ? 'À emporter' : 'Sur place')}`});
  }, [isFocused]);
  
  return (
    <View style={styles.container}>
      <ScrollView>

        <OrderDetails order={updatedOrder}/>
        <View style={{alignItems: 'center', margin: 20}}>

          <Text style={{...styles.roboto, fontSize: 16, textTransform: 'capitalize'}}>Statut : {updatedOrder.status}</Text>
          <TouchableOpacity style={{padding: 10, marginTop: 20}} onPress={() => handleCancel(updatedOrder, token, navigation)}>
            <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Annuler ma commande</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
      <FAB style={styles.fab} icon='pencil' color='white' onPress={() => navigation.navigate('UserEditOrder', {order: updatedOrder})}/>
    </View>
  );
}
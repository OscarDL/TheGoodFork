import { FAB } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { View, Text, Alert, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import OrderDetails from '../../../Reusables/Orders/OrderDetails';
import { deleteOrder, getOrder, validateOrder } from '../../../Functions/orders';


const handleValidate = (order, token, navigation) => validateOrder(order, token).then(res => Alert.alert(
  res.success ? res.title : 'Erreur lors de la validation',
  res.success ? res.desc : res,
  [{
    text: res.success ? 'Terminé' : 'Réessayer',
    onPress: () => res.success ? navigation.goBack() : null
  }]
));

const handleDelete = (order, token, navigation) => Alert.alert(
  'Êtes-vous sûr ?',
  "Vous êtes sur le point d'annuler cette commande.",
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

export default function WaiterOrderDetails({navigation, route}) {
  const {order, readOnly} = route.params.params;

  const isFocused = useIsFocused();
  const [{token}, _] = useDataLayerValue();
  const [updatedOrder, setUpdatedOrder] = useState(order);

  useEffect(() => {
    navigation.setOptions({title: `${(updatedOrder.takeaway ? 'À emporter' : 'Sur place')} - ${updatedOrder.user.firstName} ${updatedOrder.user.lastName}`});
  }, []);

  useEffect(() => {
    isFocused && getOrder(order._id, token).then(res => setUpdatedOrder(res.order));
  }, [isFocused, setUpdatedOrder]);
  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        <OrderDetails order={updatedOrder}/>
        <View style={{alignItems: 'center', margin: 20}}>
          {readOnly
            ?
          <Text style={{...styles.roboto, fontSize: 16, textTransform: 'capitalize'}}>Statut : {updatedOrder.status}</Text>
            :
          <TouchableOpacity style={{padding: 10}} onPress={() => handleDelete(updatedOrder, token, navigation)}>
            <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Supprimer cette commande</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
      <FAB style={styles.fab} icon={readOnly ? 'pencil' : 'check'} color='white'
        onPress={() => readOnly ? navigation.navigate('WaiterEditOrder', {order: updatedOrder}) : handleValidate(updatedOrder, token, navigation)}
      />
    </SafeAreaView>
  );
}
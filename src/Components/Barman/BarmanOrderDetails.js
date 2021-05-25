import { FAB } from 'react-native-paper';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, Platform } from 'react-native';

import { styles } from '../../Shared/styles';
import OrderDetails from '../../Shared/Orders/OrderDetails';


export default function BarmanOrderDetails({navigation, route}) {
  const {order} = route.params;
  
  useEffect(() => {
    navigation.setOptions({
      title: `${order.user.firstName} ${order.user.lastName}\u2000\u2013\u2000${(order.takeaway ? 'À emporter' : 'Sur place')}`
    });
  }, []);
  

  const informWaiters = () => {
    const actions = [
      {
        text: 'Informer',
        onPress: () => null /*cancelOrder(order, token).then(res => Alert.alert(
          res.success ? res.title : "Erreur lors de l'annulation",
          res.success ? res.desc : res,
          [{
            text: res.success ? 'Terminé' : 'Réessayer',
            onPress: () => res.success ? navigation.goBack() : null
          }]
        ))*/
      }, {
        text: 'Annuler',
        style: 'cancel'
      }
    ];

    return Alert.alert(
      'Valider la préparation',
      'Informer les serveurs que cette commande est prête à être servie ?',
      Platform.OS === 'ios' ? actions : actions.reverse()
    );
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>

        <OrderDetails order={order}/>
        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 16, textTransform: 'capitalize'}}>Statut : {order.status}</Text>
        </View>

      </ScrollView>
      <FAB style={styles.fab} label='Prête' icon='check' color='white' onPress={informWaiters}/>
    </View>
  );
}
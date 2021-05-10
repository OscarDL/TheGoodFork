import { FAB } from 'react-native-paper';
import React, { useEffect } from 'react';
import { View, Text, Alert, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../Reusables/Styles';
import OrderDetails from '../../Reusables/Orders/OrderDetails';


const informWaiters = (order, token, navigation) => {
  const actions = [
    {
      text: 'Annuler'
    },
    {
      text: 'Informer',
      onPress: () => null /*deleteOrder(order, token).then(res => Alert.alert(
        res.success ? res.title : "Erreur lors de l'annulation",
        res.success ? res.desc : res,
        [{
          text: res.success ? 'Terminé' : 'Réessayer',
          onPress: () => res.success ? navigation.goBack() : null
        }]
      ))*/
    }
  ];

  return Alert.alert(
    'Valider la préparation',
    'Informer les serveurs que cette commande est prête à être servie ?',
    Platform.OS === 'ios' ? actions.reverse() : actions
  );
}


export default function CookOrderDetails({navigation, route}) {
  const {order} = route.params;
  
  useEffect(() => {
    navigation.setOptions({title: `${order.user.firstName} ${order.user.lastName} : ${(order.takeaway ? 'À emporter' : 'Sur place')}`});
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>

        <OrderDetails order={order}/>
        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 16, textTransform: 'capitalize'}}>Statut : {order.status}</Text>
        </View>

      </ScrollView>
      <FAB style={styles.fab} label='Ready' icon='check' color='white' onPress={() => informWaiters(order)}/>
    </View>
  );
}
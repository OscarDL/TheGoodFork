import { FAB } from 'react-native-paper';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, Platform } from 'react-native';

import { styles } from '../../Shared/styles';
import OrderDetails from '../../Shared/Components/Orders/OrderDetails';


export default function CookOrderDetails({navigation, route}) {
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
        onPress: () => Toast.show({
          text1: 'En construction',
          text2: 'Cette fonctionnalité est en cours de développement.',

          type: 'info',
          position: 'bottom',
          visibilityTime: 1500
        })
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
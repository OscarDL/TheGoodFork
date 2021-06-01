import { FAB } from 'react-native-paper';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, Platform } from 'react-native';

import { styles } from '../../Shared/styles';
import { getStatus } from '../../Functions/utils';
import { editOrder } from '../../Functions/orders';
import { useAuthContext } from '../../Context/Auth/Provider';
import OrderDetails from '../../Shared/Components/Orders/OrderDetails';


export default function CookOrderDetails({navigation, route}) {
  const {order} = route.params;
  const [{user}] = useAuthContext();
  
  useEffect(() => {
    navigation.setOptions({
      title: `${order.user.firstName} ${order.user.lastName}\u2000\u2013\u2000${(order.takeaway ? 'À emporter' : 'Sur place')}`
    });
  }, []);
  

  const readyOrder = (status) => {
    const actions = [
      {
        text: 'Continuer',
        onPress: () => editOrder({...order, status}, user).then(res => {
          Toast.show({
            text1: res.title ?? 'Erreur de modication',
            text2: res.success ? 'Commande marquée comme prête avec succès.' : res,
  
            position: 'bottom',
            visibilityTime: 1500,
            type: res.success ? 'success' : 'error'
          });
          res.success && navigation.goBack();
        })
      }, {
        text: 'Annuler',
        style: 'cancel'
      }
    ];

    return Alert.alert(
      'Valider la préparation',
      'Marquer cette commande ' + (status === 'preparing' ? 'en préparation ?' : 'comme prête à servir ?'),
      Platform.OS === 'ios' ? actions : actions.reverse()
    );
  };

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>

        <OrderDetails order={order}/>
        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 16, textTransform: 'capitalize'}}>Statut : {getStatus(order.status)}</Text>
        </View>

      </ScrollView>

      <FAB style={styles.fab} label={order.status === 'preparing' ? 'Préparer' : 'Prêt'} icon='check'
      color='white' onPress={() => readyOrder(order.status === 'preparing' ? 'ready' : 'preparing')}/>
    </View>
  );
}
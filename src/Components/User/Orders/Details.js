import { FAB } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView, ActivityIndicator, Platform } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { useAuthContext } from '../../../Context/Auth/Provider';
import { getOrder, cancelOrder } from '../../../Functions/orders';
import OrderDetails from '../../../Shared/Components/Orders/OrderDetails';


export default function UserOrderDetails({navigation, route}) {
  const {order} = route.params;
  const isFocused = useIsFocused();
  const [{token}] = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState(order);
  
  useEffect(() => {
    isFocused && getOrder(order._id, token).then(res => res.success && setUpdatedOrder(res.order));
    navigation.setOptions({title: `Commande ${(updatedOrder.takeaway ? 'à emporter' : 'sur place')}`});
  }, [isFocused]);

  useEffect(() => {
    !order.paid && (function() {
      const actions = [
        {
          text: 'Payer',
          onPress: () => navigation.navigate('UserPayOrder', {order, type: 'edit'})
        }, {
          text: 'Plus tard',
          style: 'cancel'
        }
      ];

      return Alert.alert(
        'Commande impayée',
        'Souhaitez-vous la payer maintenant ?',
        Platform.OS === 'ios' ? actions : actions.reverse()
      );
    }());
  }, [order]);


  const handleCancel = () => {
    const actions = [
      {
        text: 'Continuer',
        style: 'destructive',
        onPress: () => {
          setLoading(true);

          cancelOrder(order, token).then(res => {
            setLoading(false);

            Toast.show({
              text1: res.title ?? "Erreur d'annulation",
              text2: res.desc ?? res,
              
              position: 'bottom',
              visibilityTime: 1500,
              type: res.success ? 'success' : 'error'
            });

            res.success && navigation.goBack();
          })
        }
      }, {
        text: 'Revenir',
        style: 'cancel'
      }
    ];

    Alert.alert(
      'Êtes-vous sûr ?',
      "Vous êtes sur le point d'annuler votre commande.",
      Platform.OS === 'ios' ? actions : actions.reverse()
    );
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        <OrderDetails order={updatedOrder}/>

        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 16, textTransform: 'capitalize'}}>Statut : {updatedOrder.status}</Text>
          
          {!updatedOrder.validated && (
            <TouchableOpacity style={{padding: 10, marginTop: 20}} onPress={handleCancel}>
              <Text style={styles.delete}>Annuler ma commande</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {!updatedOrder.validated && !updatedOrder.paid && (
        <FAB style={styles.fab} icon='pencil' label='Modifier' color='white'
        onPress={() => navigation.navigate('UserEditOrder', {order: updatedOrder})}/>
      )}

      {loading && <View style={{...styles.container, ...styles.iosDateBackdrop, justifyContent: 'center'}}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
      </View>}
    </SafeAreaView>
  );
}
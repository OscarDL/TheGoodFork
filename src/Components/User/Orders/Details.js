import { FAB } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Alert, SafeAreaView, ActivityIndicator, Platform } from 'react-native';

import Text from '../../Shared/Text';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getStatus } from '../../../Functions/utils';
import OrderDetails from '../../Shared/Orders/OrderDetails';
import { getOrder, cancelOrder } from '../../../Functions/orders';


export default function UserOrderDetails({navigation, route}) {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(route.params.order);
  
  useEffect(() => {
    isFocused && getOrder(route.params.order._id).then(res => res.success && setOrder(res.order));
    navigation.setOptions({title: `Commande ${(route.params.order.takeaway ? 'à emporter' : 'sur place')}`});
  }, [isFocused]);

  useEffect(() => {
    const actions = [
      {
        text: 'Payer',
        onPress: () => navigation.navigate('UserPayOrder', {order: route.params.order, type: 'edit'})
      }, {
        text: 'Plus tard',
        style: 'cancel'
      }
    ];

    !route.params.order.paid && (
      Alert.alert(
        'Commande impayée',
        'Souhaitez-vous la payer maintenant ?',
        Platform.OS === 'ios' ? actions : actions.reverse()
      )
    );
  }, []);


  const handleCancel = () => {
    const actions = [
      {
        text: 'Continuer',
        style: 'destructive',
        onPress: () => {
          setLoading(true);

          cancelOrder(order).then(res => {
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
        <OrderDetails order={order}/>

        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 16, textTransform: 'capitalize'}}>Statut : {getStatus(order.status)}</Text>
          
          {!order.validated && (
            <TouchableOpacity style={{padding: 10, marginTop: 20}} onPress={handleCancel}>
              <Text style={styles.delete}>Annuler ma commande</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {!order.validated && !order.paid && (
        <FAB style={styles.fab} icon='pencil' label='Modifier' color='white'
        onPress={() => navigation.navigate('UserEditOrder', {order})}/>
      )}

      {loading && <View style={{...styles.container, ...styles.iosDateBackdrop, justifyContent: 'center'}}>
        <ActivityIndicator size={60} color={colors.accentPrimary}/>
      </View>}
    </SafeAreaView>
  );
}
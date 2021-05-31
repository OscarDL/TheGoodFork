import { FAB } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView, ActivityIndicator, Platform } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import OrderDetails from '../../../Shared/Components/Orders/OrderDetails';
import { cancelOrder, getOrder, validateOrder } from '../../../Functions/orders';


export default function WaiterOrderDetails({navigation, route}) {
  const {pay = false, readOnly} = route.params;

  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(route.params.order);

  useEffect(() => {
    isFocused && getOrder(route.params.order._id).then(res => setOrder(res.order));
    navigation.setOptions({
      title: `${route.params.order.user.firstName} ${route.params.order.user.lastName}` +
      `\u2000\u2013\u2000${(route.params.order.takeaway ? 'À emporter' : 'Sur place')}`
    });
  }, [isFocused, setOrder]);


  const handleValidate = () => {
    setLoading(true);

    validateOrder(order).then(res => {
      setLoading(false);

      Toast.show({
        text1: res.title ?? 'Erreur de validation',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      
      res.success && navigation.goBack();
    });
  };
  
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
          });
        }
      }, {
        text: 'Revenir',
        style: 'cancel'
      }
    ];

    Alert.alert(
      'Êtes-vous sûr ?',
      "Vous êtes sur le point d'annuler cette commande.",
      Platform.OS === 'ios' ? actions : actions.reverse()
    );
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        <OrderDetails order={order}/>
        <View style={{alignItems: 'center', margin: 20, marginBottom: 80}}>
          {readOnly
            ?
          <Text style={{fontSize: 16, marginBottom: 15, textTransform: 'capitalize'}}>Statut : {order.status}</Text>
            :
          <>
            <TouchableOpacity style={{padding: 10}} onPress={handleValidate}>
              <Text style={styles.link}>Valider cette commande</Text>
            </TouchableOpacity>
            <Text> </Text>
            <TouchableOpacity style={{padding: 10}} onPress={handleCancel}>
              <Text style={styles.delete}>Annuler cette commande</Text>
            </TouchableOpacity>
          </>}
        </View>
      </ScrollView>

      {!readOnly && !order.validated && !order.paid && (
        <FAB style={styles.fab} icon='pencil' label='Modifier' color='white'
        onPress={() => navigation.navigate('WaiterEditOrder', {order})}/>
      )}

      {pay && (
        <FAB style={styles.fab} icon='credit-card' label='Payer' color='white'
        onPress={() => navigation.navigate('WaiterPayOrder', {order, type: 'edit'})}/>
      )}

      {loading && <View style={{...styles.container, ...styles.iosDateBackdrop, justifyContent: 'center'}}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
      </View>}

    </SafeAreaView>
  );
}
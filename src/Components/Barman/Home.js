import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { View, Text, ScrollView, ActivityIndicator, Alert, Platform, SafeAreaView } from 'react-native';

import { colors } from '../../Shared/colors';
import { styles } from '../../Shared/styles';
import { getOrders } from '../../Functions/orders';
import TouchCard from '../../Shared/Components/TouchCard';
import { useAuthContext } from '../../Context/Auth/Provider';


const failureAlert = (error, setRetry) => {
  const actions = [
    {
      text: 'Réessayer',
      onPress: () => setRetry(true)
    }, {
      text: 'Annuler',
      style: 'cancel'
    }
  ];

  Alert.alert(
    "Erreur d'affichage des commandes", error,
    Platform.OS === 'ios' ? actions : actions.reverse()
  );
};


export default function BarmanHome({navigation}) {
  const isFocused = useIsFocused();
  const [{user}] = useAuthContext();
  
  const [retry, setRetry] = useState(false);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (isFocused || retry) getOrders(user).then(res => {
      res.success ? setOrders(res.orders) : failureAlert(res, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry]);


  return orders ? (
    <SafeAreaView style={styles.container}>
      {orders?.filter(order => order.validated).length > 0 ? (
        <ScrollView contentContainerStyle={{paddingVertical: 5}}>
          <Text style={styles.title}>Commandes à préparer</Text>

          {orders.map((order, i) => order.validated && <TouchCard
            key={i} icon='restaurant' title={new Date(order.dateOrdered).toDateString().slice(4, -5) + ', ' + 
            new Date(order.dateOrdered).toLocaleTimeString()} subtitle={(order.price + order.tip) + ' ' + order.currency}
            description={'Statut : ' + order.status} screen='BarmanOrderDetails' params={{order}} navigation={navigation}
          />)}
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Aucune commande à préparer pour l'instant.</Text>
        </View>
      )}
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  );
}
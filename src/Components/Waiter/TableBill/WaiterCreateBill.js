import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView, ActivityIndicator, Platform } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import BaseCard from '../../../Shared/BaseCard';
import SearchBar from '../../../Shared/SearchBar';
import { getOrders } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';
import { matchesOrder, truncPrice } from '../../../Functions/utils';


const failureAlert = (error, navigation, setRetry) => Alert.alert(
  "Erreur d'affichage des commandes", error,
  [{
    text: 'Annuler',
    onPress: () => navigation.goBack()
  },
  {
    text: 'Réessayer',
    onPress: () => setRetry(true)
  }]
);

export default function WaiterCreateBill({navigation}) {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [retry, setRetry] = useState(false);
  const [orders, setOrders] = useState(null);
  const [{user, token}] = useDataLayerValue();

  useEffect(() => {
    if (isFocused || retry) getOrders(user, token).then(res => {
      res.success ? setOrders(res.orders) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry]);


  return orders ? (
    <SafeAreaView style={styles.container}>
      {orders.length > 0 ? <>
        <SearchBar search={search} setSearch={setSearch} placeholder='Rechercher un client'/>

        <ScrollView contentContainerStyle={{paddingVertical: 5}}>
          <View>
            <Text style={styles.title}>Commandes impayées</Text>

            {orders.filter(order => !order.paid)?.map((order, i) => matchesOrder(order, search) && <BaseCard
              key={i} icon='how-to-reg' title={`${order.user.firstName} ${order.user.lastName}`} params={{order, pay: true, readOnly: true}}
              subtitle={`${truncPrice(order.price + order.tip)} ${order.currency}`} screen='WaiterOrderDetails' navigation={navigation}
              description={`${new Date(order.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order.dateOrdered).toLocaleTimeString()}`}
            />)}
          </View>
        </ScrollView>
      </> : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Aucune commande à faire payer pour l'instant.</Text>
        </View>
      )}
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  );
}
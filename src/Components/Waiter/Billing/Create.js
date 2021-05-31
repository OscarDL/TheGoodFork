import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView, ActivityIndicator, Platform } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getOrders } from '../../../Functions/orders';
import SearchBar from '../../../Shared/Components/SearchBar';
import TouchCard from '../../../Shared/Components/TouchCard';
import { useAuthContext } from '../../../Context/Auth/Provider';
import { matchesOrder, truncPrice } from '../../../Functions/utils';


const failureAlert = (error, navigation, setRetry) => {
  const actions = [
    {
      text: 'Réessayer',
      onPress: () => setRetry(true)
    }, {
      text: 'Annuler',
      style: 'cancel',
      onPress: () => navigation.goBack()
    }
  ];

  Alert.alert(
    "Erreur d'affichage des commandes", error,
    Platform.OS === 'ios' ? actions : actions.reverse()
  );
};


export default function WaiterCreateBill({navigation}) {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [retry, setRetry] = useState(false);
  const [orders, setOrders] = useState(null);
  const [{user, token}] = useAuthContext();

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

            {orders.filter(order => !order.paid)?.map((order, i) => matchesOrder(order, search) && <TouchCard
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
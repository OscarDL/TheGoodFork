import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView, ActivityIndicator, Platform } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getOrders } from '../../../Functions/orders';
import SearchBar from '../../../Shared/Components/SearchBar';
import TouchCard from '../../../Shared/Components/TouchCard';
import { useDataLayerValue } from '../../../Context/DataLayer';
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


export default function WaiterCheckOrders({navigation}) {
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
            <Text style={styles.title}>Prêt à servir</Text>
            {orders.filter(order => order.status === 'ready')?.length > 0
              ?
            orders.map((order, i) => matchesOrder(order, search) && <TouchCard
              key={i} size={26} icon='how-to-reg' title={`${order.user.firstName} ${order.user.lastName}`} params={{order, readOnly: false}}
              subtitle={`${truncPrice(order.price + order.tip)} ${order.currency}`} screen='WaiterOrderDetails' navigation={navigation}
              description={`${new Date(order.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order.dateOrdered).toLocaleTimeString()}`}
            />)
              :
            <Text style={styles.emptySection}>Aucune commande prête à servir.</Text>}
          </View>

          <View>
            <Text style={styles.title}>En préparation</Text>
            {orders.filter(order => order.status === 'preparing')?.length > 0
              ?
            orders.map((order, i) => matchesOrder(order, search) && <TouchCard
              key={i} size={26} icon='how-to-reg' title={`${order.user.firstName} ${order.user.lastName}`} params={{order, readOnly: false}}
              subtitle={`${truncPrice(order.price + order.tip)} ${order.currency}`} screen='WaiterOrderDetails' navigation={navigation}
              description={`${new Date(order.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order.dateOrdered).toLocaleTimeString()}`}
            />)
              :
            <Text style={styles.emptySection}>Aucune commande en préparation.</Text>}
          </View>
        </ScrollView>
      </> : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Aucune commande pour l'instant.</Text>
        </View>
      )}
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  );
}
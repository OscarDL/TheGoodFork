import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Alert, SafeAreaView, ActivityIndicator, Platform } from 'react-native';

import Text from '../../Shared/Text';
import SearchBar from '../../Shared/SearchBar';
import TouchCard from '../../Shared/TouchCard';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getOrders } from '../../../Functions/orders';
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

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const months = ['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];


export default function WaiterCheckOrders({navigation}) {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [retry, setRetry] = useState(false);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (isFocused || retry) getOrders().then(res => {
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
            orders.filter(order => order.status === 'ready').map((order, i) => {
              const date = new Date(order.dateOrdered);
              return matchesOrder(order, search) ? <TouchCard
                key={i} icon='how-to-reg' title={`${order.user.firstName} ${order.user.lastName}`} params={{order, readOnly: true}}
                subtitle={`${truncPrice(order.price + order.tip)} ${order.currency}`} screen='WaiterOrderDetails' navigation={navigation}
                description={`${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}, ${new Date(date).toLocaleTimeString()}`}
              /> : null
            })
              :
            <Text style={styles.emptySection}>Aucune commande prête à servir.</Text>}
          </View>

          <View>
            <Text style={styles.title}>En préparation</Text>
            {orders.filter(order => order.status === 'preparing')?.length > 0
              ?
            orders.filter(order => order.status === 'preparing').map((order, i) => {
              const date = new Date(order.dateOrdered);
              return matchesOrder(order, search) ? <TouchCard
                key={i} icon='how-to-reg' title={`${order.user.firstName} ${order.user.lastName}`} params={{order, readOnly: true}}
                subtitle={`${truncPrice(order.price + order.tip)} ${order.currency}`} screen='WaiterOrderDetails' navigation={navigation}
                description={`${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}, ${new Date(date).toLocaleTimeString()}`}
              /> : null
            })
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
      <ActivityIndicator size={60} color={colors.accentPrimary}/>
    </View>
  );
}
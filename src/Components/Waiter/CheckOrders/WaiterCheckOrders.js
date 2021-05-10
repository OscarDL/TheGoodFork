import { View, Text, Alert, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import BaseCard from '../../../Reusables/BaseCard';
import { styles } from '../../../Reusables/Styles';
import SearchBar from '../../../Reusables/SearchBar';
import { getOrders } from '../../../Functions/orders';
import { matchesOrder } from '../../../Functions/utils';
import { useDataLayerValue } from '../../Context/DataLayer';


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

export default function WaiterCheckOrders({navigation}) {

  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [retry, setRetry] = useState(false);
  const [orders, setOrders] = useState(null);
  const [{user, token}, _] = useDataLayerValue();

  useEffect(() => {
    if (isFocused || retry) getOrders(user, token).then(res => {
      res.success ? setOrders(res.orders) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry]);


  return (
    <SafeAreaView style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} placeholder='Rechercher un client'/>

      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        <View>
          <Text style={styles.title}>Prêt à servir</Text>
          {orders?.filter(order => order.status === 'ready' && order.orderedBy === user.email)?.length > 0
            ?
          orders.map((order, i) => matchesOrder(order, search) && <BaseCard
            key={i} icon='how-to-reg' title={order?.user?.firstName + ' ' + order?.user?.lastName} subtitle={order?.price + ' ' + order?.currency}
            description={`${new Date(order?.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order?.dateOrdered).toLocaleTimeString()}`}
            screen='WaiterOrderDetails' params={{order, readOnly: true}} navigation={navigation}
          />)
            :
          <Text style={styles.emptySection}>Aucune commande prête à servir.</Text>}
        </View>

        <View>
          <Text style={styles.title}>En préparation</Text>
          {orders?.filter(order => order.status === 'preparing' && order.orderedBy === user.email)?.length > 0
            ?
          orders.map((order, i) => matchesOrder(order, search) && <BaseCard
            key={i} icon='how-to-reg' title={order?.user?.firstName + ' ' + order?.user?.lastName} subtitle={order?.price + ' ' + order?.currency}
            description={`${new Date(order?.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order?.dateOrdered).toLocaleTimeString()}`}
            screen='WaiterOrderDetails' params={{order, readOnly: true}} navigation={navigation}
          />)
            :
          <Text style={styles.emptySection}>Aucune commande en préparation.</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
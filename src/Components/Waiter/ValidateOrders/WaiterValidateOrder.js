import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import BaseCard from '../../../Reusables/BaseCard';
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

export default function WaiterValidateOrder({navigation}) {

  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()
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
        {orders?.length > 0 && <>
          <View>
            <Text style={styles.title}>Commandes</Text>

            {orders?.map((order, i) => matchesOrder(order, search) && <BaseCard
              key={i} size={26} icon='how-to-reg' title={`${order?.user?.firstName} ${order?.user?.lastName}`} subtitle={order?.price + ' ' + order?.currency}
              description={`${new Date(order?.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order?.dateOrdered).toLocaleTimeString()}`}
              screen='WaiterOrderDetails' params={{order, readOnly: false}} navigation={navigation}
            />)}
          </View>
        </>}
      </ScrollView>
    </SafeAreaView>
  );
}
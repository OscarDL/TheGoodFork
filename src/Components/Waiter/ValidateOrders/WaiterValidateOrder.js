import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import BaseCard from '../../../Reusables/BaseCard';
import SearchBar from '../../../Reusables/SearchBar';
import { getOrders } from '../../../Functions/orders';
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
  const [retry, setRetry] = useState(false);
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(null);
  const [{user, token}, _] = useDataLayerValue();

  useEffect(() => {
    if (isFocused || retry) getOrders(user, token).then(res => {
      res.success ? setOrders(res.orders) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry]);


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <SearchBar search={search} setSearch={setSearch} />

      <ScrollView>
        {orders?.length > 0 && <>
          <View>
            <Text style={styles.title}>Commandes</Text>

            {orders?.map((order, i) => (order.user.firstName.toLowerCase().includes(search.toLowerCase()) || order.user.lastName.toLowerCase().includes(search.toLowerCase()) || (order.user.firstName.toLowerCase() + ' ' + order.user.lastName.toLowerCase()).includes(search.toLowerCase()))
              &&
            <BaseCard
              key={i} size={26} icon='how-to-reg' title={`${order?.user?.firstName} ${order?.user?.lastName}`} subtitle={order?.price + ' ' + order?.currency}
              description={`${new Date(order?.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order?.dateOrdered).toLocaleTimeString()}`}
              screen='WaiterOrderDetails' params={{order, readOnly: false}} navigation={navigation}
            />)}
          </View>
        </>}
      </ScrollView>
    </View>
  );
}
import axios from 'axios';
import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import StaffHomeCard from '../../../Reusables/StaffHomeCard';


const failureAlert = (error, navigation) => {
  Alert.alert(
    "Couldn't retrieve orders",
    error,
    [
      {
        text: 'CANCEL',
        onPress: () => navigation.goBack()
      },
      {
        text: 'RETRY',
        onPress: () => getOrders(token)
      }
    ]
  );
}


export default function WaiterValidateOrder({navigation}) {

  const [{token}, _] = useDataLayerValue();
  const [orders, setOrders] = useState(null);
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  const getOrders = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    try {
      const {data} = await axios.get('https://the-good-fork.herokuapp.com/api/orders', config);

      let newOrders = [];

      if (data.success) {
        data.orders?.map(order => order.validated === false && newOrders.push(order));
        setOrders(newOrders);
      } else failureAlert(data?.error, navigation);
      
    } catch (error) { failureAlert(error.response?.data.error, navigation); }
  };

  useEffect(() => { if (isFocused && token) getOrders(token); }, [token, isFocused]);


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        {orders?.length > 0 && <>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Orders</Text>

            {orders?.map((order, i) => <StaffHomeCard
              key={i} size={26} icon='how-to-reg' title={`${order?.user?.firstName} ${order?.user?.lastName}`} subtitle={order?.price + ' ' + order?.currency}
              description={`${new Date(order?.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order?.dateOrdered).toLocaleTimeString()}`}
              screen='WaiterOrderDetails' params={order} navigation={navigation}
            />)}

          </View>
        </>}
      </ScrollView>
    </View>
  );
}
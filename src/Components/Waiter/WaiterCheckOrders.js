import axios from 'axios';
import { View, Text, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button, Icon } from 'react-native-elements';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';
import StaffHomeCard from '../../Reusables/StaffHomeCard';


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


export default function WaiterCheckOrders({navigation}) {

  const [{token}, _] = useDataLayerValue();
  const [orders, setOrders] = useState(null);
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  useEffect(() => { if (isFocused && token) getOrders(token); }, [token, isFocused]);


  const getOrders = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    try {
      const {data} = await axios.get('https://the-good-fork.herokuapp.com/api/orders', config);

      (data?.success && data?.orders) ? setOrders(data.orders) : failureAlert(data?.error, navigation);
      
    } catch (error) { failureAlert(error.response.data.error, navigation); }
  };


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        {orders?.length > 0 && <>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Ready</Text>
            {orders?.map((order, i) => order.orderStatus === 'ready' && <StaffHomeCard
              key={i} icon='how-to-reg' title={order?.user?.firstName + ' ' + order?.user?.lastName} subtitle={order?.price + ' ' + order?.currency}
              description={`${new Date(order?.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order?.dateOrdered).toLocaleTimeString()}`}
              screen='WaiterOrderDetail' params={order} navigation={navigation}
            />)}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Preparing</Text>
            {orders?.map((order, i) => order.orderStatus === 'preparing' && <StaffHomeCard
              key={i} icon='how-to-reg' title={order?.user?.firstName + ' ' + order?.user?.lastName} subtitle={order?.price + ' ' + order?.currency}
              description={`${new Date(order?.dateOrdered).toDateString().slice(4, -5)}, ${new Date(order?.dateOrdered).toLocaleTimeString()}`}
              screen='WaiterOrderDetail' params={order} navigation={navigation}
            />)}
          </View>
        </>}
      </ScrollView>
    </View>
  );
}
import { View, Text, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { getOrders } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';
import StaffHomeCard from '../../../Reusables/StaffHomeCard';


const failureAlert = (error, user, token, navigation) => {
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
        onPress: () => getOrders(user, token)
      }
    ]
  );
}


export default function WaiterValidateOrder({navigation}) {

  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(null);
  const [{user, token}, _] = useDataLayerValue();

  useEffect(() => {
    if (isFocused && token) {
      getOrders(user, token).then(res => res.success ? setOrders(res.orders) : failureAlert(res, user, token, navigation));
    }
  }, [isFocused]);


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <SearchBar placeholder='Search a customer...' onChangeText={setSearch} value={search} lightTheme inputContainerStyle={{backgroundColor: 'white'}}/>
      <ScrollView>
        {orders?.length > 0 && <>
          <View style={{marginTop: 6}}>
            <Text style={styles.title}>Orders</Text>

            {orders?.map((order, i) => (order.user.firstName.toLowerCase().includes(search.toLowerCase()) || order.user.lastName.toLowerCase().includes(search.toLowerCase()) || (order.user.firstName.toLowerCase() + ' ' + order.user.lastName.toLowerCase()).includes(search.toLowerCase()))
              &&
            <StaffHomeCard
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
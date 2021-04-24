import { FAB } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, ScrollView, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import UserNewOrder from './UserNewOrder';
import UserEditOrder from './UserEditOrder';
import UserOrderDetails from './UserOrderDetails';
import { styles } from '../../../Reusables/Styles';
import { getOrders } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';
import StaffHomeCard from '../../../Reusables/StaffHomeCard';


const Stack = createStackNavigator();

export default function UserOrders({title}) {
  return (
    <Stack.Navigator initialRouteName='UserOrdersComponent'>
      <Stack.Screen options={{title}} name='UserOrdersComponent' component={UserOrdersComponent} />
      <Stack.Screen options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} name='UserNewOrder'>
        {props => <UserNewOrder {...props} title={title}/>}
      </Stack.Screen>
      <Stack.Screen options={{title: 'Order details', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} name='UserOrderDetails' component={UserOrderDetails} />
      <Stack.Screen options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} name='UserEditOrder'>
        {props => <UserEditOrder {...props} title={'Edit order'}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function UserOrdersComponent({navigation}) {
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState(null);
  const [{user, token}, _] = useDataLayerValue();

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date(Date.now()));

  useEffect(() => {
    isFocused && getOrders(user, token).then(res => setOrders(res.orders));
  }, [isFocused]);


  const handleNavigation = () => Alert.alert(
    'Type de commande',
    'Nous offrons des commandes sur place et à emporter. Faites votre choix !',
    [{
      text: 'Annuler'
    }, {
      text: 'Sur place',
      onPress: () => navigation.navigate('UserNewOrder', {type: {takeaway: false}})
    }, {
      text: 'À emporter',
      onPress: () => setShow(true)
    }]
  );

  const onChange = (e) => {
    setShow(false);
    if (e.type === 'dismissed') return setMode('date');

    const newDate = new Date(e.nativeEvent.timestamp); setDate(newDate);

    if (mode === 'date') {
      setMode('time'); setShow(true);
    } else {
      setMode('date'); // if user goes back in navigation stack and wants to choose a new time
      navigation.navigate('UserNewOrder', {type: {takeaway: true, date: newDate.toUTCString()}});
    }
  };


  return (
    <View style={styles.container}>
      {orders && (orders?.length > 0 ? <ScrollView contentContainerStyle={{paddingVertical: 5}}>

        <View>
          <Text style={{...styles.title, marginTop: 6}}>To be paid</Text>
          {orders?.filter(order => !order.paid).length > 0 ? orders.map((order, i) => !order.paid && <StaffHomeCard
            key={i} icon='restaurant' title={new Date(order.dateOrdered).toDateString().slice(4, -5) + ', ' + 
            new Date(order.dateOrdered).toLocaleTimeString()} subtitle={order?.price + ' ' + order?.currency}
            description={'Status: ' + order.status} screen='UserOrderDetails' params={{order}} navigation={navigation}
          />) : <Text style={styles.emptySection}>You don't have any order to pay.</Text>}
        </View>

        <View>
          <Text style={{...styles.title, marginTop: 6}}>History</Text>
          {orders?.filter(order => order.paid).length > 0 ? orders.map((order, i) => order.paid && <StaffHomeCard
            key={i} icon='restaurant' title={new Date(order.dateOrdered).toDateString().slice(4, -5) + ', ' + 
            new Date(order.dateOrdered).toLocaleTimeString()} subtitle={order?.price + ' ' + order?.currency}
            description={'Status: ' + order.status} screen='UserOrderDetails' params={{order}} navigation={navigation}
          />) : <Text style={styles.emptySection}>You don't have any previous orders.</Text>}
        </View>

      </ScrollView> : <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{...styles.title, padding: 0, margin: 0}}>You don't have any orders.</Text>
      </View>)}

      {show && <DateTimePicker
        mode={mode}
        value={date}
        is24Hour={true}
        display='default'
        onChange={onChange}
      />}

      <FAB style={styles.fab} animated label='New order' icon='plus' color='white' onPress={handleNavigation}/>
    </View>
  );
}
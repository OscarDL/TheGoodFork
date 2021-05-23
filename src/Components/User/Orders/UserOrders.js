import { FAB } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { View, ScrollView, Text, Alert, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';

import UserNewOrder from './UserNewOrder';
import UserPayOrder from './UserPayOrder';
import UserEditOrder from './UserEditOrder';
import UserSubmitOrder from './UserSubmitOrder';
import UserOrderDetails from './UserOrderDetails';
import BaseCard from '../../../Shared/BaseCard';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getOrders } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';
import { truncPrice } from '../../../Functions/utils';


const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();
const iosH = CardStyleInterpolators.forHorizontalIOS;
const iosV = Platform.OS === 'ios' ? iosH : CardStyleInterpolators.forVerticalIOS;


const failureAlert = (error, setRetry) => Alert.alert(
  "Erreur d'affichage des commandes", error,
  [{
    text: 'Annuler'
  },
  {
    text: 'Réessayer',
    onPress: () => setRetry(true)
  }]
);

const style = {
  pressColor: 'darkgrey',
  activeTintColor: colors.accentPrimary,
  labelStyle: {fontSize: 14, fontWeight: 'bold'},
  indicatorStyle: {backgroundColor: colors.accentSecondary}
};


export default function UserOrders({title}) {
  return (
    <Stack.Navigator initialRouteName='UserOrderTabs'>
      <Stack.Screen options={{title}} name='UserOrderTabs' component={UserOrderTabs} />
      <Stack.Screen options={{cardStyleInterpolator: iosV, title: 'Nouvelle commande'}} name='UserNewOrder' component={UserNewOrder}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Détails commande'}} name='UserOrderDetails' component={UserOrderDetails} />
      <Stack.Screen options={{cardStyleInterpolator: iosV, title: 'Modifier commande'}} name='UserEditOrder' component={UserEditOrder}/>
      <Stack.Screen options={{cardStyleInterpolator: iosV, title: 'Payer commande'}} name='UserPayOrder' component={UserPayOrder}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Vérification'}} name='UserSubmitOrder' component={UserSubmitOrder}/>
    </Stack.Navigator>
  );
};


function UserOrdersComponent({navigation, paid, orders}) {
  return (
    <View style={styles.container}>
      {orders?.filter(order => order.paid === paid).length > 0
        ?
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        <View>
          {orders.map((order, i) => order.paid === paid &&
            <BaseCard key={i} icon='restaurant' description={'Statut : ' + order.status}
            params={{order}} title={new Date(order.dateOrdered).toDateString().slice(4, -5)
            + `, ${new Date(order.dateOrdered).toLocaleTimeString()}`} navigation={navigation}
            subtitle={`${truncPrice(order.price + order.tip)} ${order.currency}`} screen='UserOrderDetails'
          />)}
        </View>
      </ScrollView>
        :
      <View>
        <Text style={styles.emptySection}>Vous n'avez aucune commande à payer.</Text>
      </View>}
    </View>
  );
};


function UserOrderTabs({navigation}) {
  const isFocused = useIsFocused();
  const [retry, setRetry] = useState(false);
  const [orders, setOrders] = useState(null);
  const [{token, user}] = useDataLayerValue();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date(Date.now()));

  const fabActions = [{
    text: 'Annuler'
  }, {
    text: 'Sur place',
    onPress: () => navigation.navigate('UserNewOrder', {type: {takeaway: false}})
  }, {
    text: 'À emporter',
    onPress: () => setShow(true)
  }];

  useEffect(() => {
    if ((isFocused || retry) && token) getOrders(user, token).then(res => {
      res.success ? setOrders(res.orders) : failureAlert(res, setRetry);
      setRetry(false);
    });
  }, [isFocused, token, retry, setRetry]);


  const androidChange = (e) => {
    setShow(false);
    if (e.type === 'dismissed') return setMode('date');

    const newDate = new Date(e.nativeEvent.timestamp); setDate(newDate);

    if (mode === 'time') {
      setMode('date');
      return navigation.navigate('UserNewOrder', {type: {takeaway: true, date: newDate.toUTCString()}});
    }
    
    setMode('time'); setShow(true);
  };

  const iosChange = () => {
    if (mode === 'date') return setMode('time');
    
    setShow(false);
    setMode('date');
    const newDate = date; setDate(new Date(Date.now()));

    navigation.navigate('UserNewOrder', {type: {takeaway: true, date: newDate.toUTCString()}});
  };

  const iosCancel = () => {
    if (mode === 'time') return setMode('date');

    setShow(false);
    setMode('date');
    setDate(new Date(Date.now()));
  };


  const handleNavigation = () => Alert.alert(
    'Type de commande',
    'Nous offrons des commandes sur place et à emporter. Faites votre choix !',
    [
      fabActions[Platform.OS === 'ios' ? 1 : 0],
      fabActions[Platform.OS === 'ios' ? 2 : 1],
      fabActions[Platform.OS === 'ios' ? 0 : 2]
    ]
  );


  return orders ? (
    <>
      {orders.length > 0 ? (
        <View style={styles.container}>
          <Tabs.Navigator
            tabBarOptions={style}
            initialRouteName='A Payer'
            backBehavior='initialRoute'
          >
            <Tabs.Screen name='A payer'>
              {props => <UserOrdersComponent {...props} paid={false} orders={orders}/>}
            </Tabs.Screen>
            <Tabs.Screen name='Payées'>
              {props => <UserOrdersComponent {...props} paid={true} orders={orders}/>}
            </Tabs.Screen>
          </Tabs.Navigator>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Vous n'avez pas de commandes.</Text>
        </View>
      )}

      {show && (Platform.OS === 'ios' ? <View style={styles.iosDateBackdrop}>
        <View style={styles.iosDateBg}>
          <DateTimePicker
            mode={mode}
            value={date}
            is24Hour={true}
            display='spinner'
            textColor='black'
            minimumDate={new Date(Date.now()).setHours(0,0,0,0)}
            onChange={e => setDate(new Date(e.nativeEvent.timestamp))}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={iosCancel}>
              <Text style={{padding: 24, color: '#f22', fontSize: 18}}>{mode === 'date' ? 'Cancel' : 'Previous'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={iosChange}>
              <Text style={{padding: 24, color: '#28f', fontWeight: '500', fontSize: 18}}>{mode === 'date' ? 'Next' : 'Done'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> : <DateTimePicker
        mode={mode}
        value={date}
        is24Hour={true}
        display='default'
        onChange={androidChange}
        minimumDate={new Date(Date.now()).setHours(0,0,0,0)}
      />)}

      <FAB style={styles.fab} animated label='Commander' icon='plus' color='white' onPress={handleNavigation}/>
    </>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  )
};
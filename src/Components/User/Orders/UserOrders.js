import { FAB } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { View, ScrollView, Text, Alert, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';

import UserNewOrder from './UserNewOrder';
import UserEditOrder from './UserEditOrder';
import UserSubmitOrder from './UserSubmitOrder';
import UserOrderDetails from './UserOrderDetails';
import BaseCard from '../../../Reusables/BaseCard';
import { styles } from '../../../Reusables/Styles';
import { getOrders } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';


const Stack = createStackNavigator();
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


export default function UserOrders({title}) {
  return (
    <Stack.Navigator initialRouteName='UserOrdersComponent'>
      <Stack.Screen options={{title}} name='UserOrdersComponent' component={UserOrdersComponent} />
      <Stack.Screen options={{cardStyleInterpolator: iosV, title: 'Nouvelle commande'}} name='UserNewOrder' component={UserNewOrder}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Détails commande'}} name='UserOrderDetails' component={UserOrderDetails} />
      <Stack.Screen options={{cardStyleInterpolator: iosV, title: 'Modifier commande'}} name='UserEditOrder' component={UserEditOrder}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Vérification'}} name='UserSubmitOrder' component={UserSubmitOrder}/>
    </Stack.Navigator>
  );
}

function UserOrdersComponent({navigation}) {
  const isFocused = useIsFocused();
  const [retry, setRetry] = useState(false);
  const [orders, setOrders] = useState(null);
  const [{user, token}, _] = useDataLayerValue();

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date(Date.now()));

  const [fabActions] = useState([{
    text: 'Annuler'
  }, {
    text: 'Sur place',
    onPress: () => navigation.navigate('UserNewOrder', {type: {takeaway: false}})
  }, {
    text: 'À emporter',
    onPress: () => setShow(true)
  }]);

  useEffect(() => {
    if ((isFocused || retry) && token) getOrders(user, token).then(res => {
      res.success ? setOrders(res.orders) : failureAlert(res, setRetry);
      setRetry(false);
    });
  }, [isFocused, token, retry, setRetry]);


  const handleNavigation = () => Alert.alert(
    'Type de commande',
    'Nous offrons des commandes sur place et à emporter. Faites votre choix !',
    [
      fabActions[Platform.OS === 'ios' ? 1 : 0],
      fabActions[Platform.OS === 'ios' ? 2 : 1],
      fabActions[Platform.OS === 'ios' ? 0 : 2]
    ]
  );

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


  return (
    <View style={styles.container}>
      {orders ? (orders?.length > 0 ? <ScrollView contentContainerStyle={{paddingVertical: 5}}>

        <View>
          <Text style={{...styles.title, marginTop: 6}}>À payer</Text>
          {orders?.filter(order => !order.paid).length > 0 ? orders.map((order, i) => !order.paid && <BaseCard
            key={i} icon='restaurant' title={new Date(order.dateOrdered).toDateString().slice(4, -5) + ', ' + 
            new Date(order.dateOrdered).toLocaleTimeString()} subtitle={order?.price + ' ' + order?.currency}
            description={'Status: ' + order.status} screen='UserOrderDetails' params={{order}} navigation={navigation}
          />) : <Text style={styles.emptySection}>Vous n'avez aucune commande à payer.</Text>}
        </View>

        <View>
          <Text style={{...styles.title, marginTop: 6}}>Historique</Text>
          {orders?.filter(order => order.paid).length > 0 ? orders.map((order, i) => order.paid && <BaseCard
            key={i} icon='restaurant' title={new Date(order.dateOrdered).toDateString().slice(4, -5) + ', ' + 
            new Date(order.dateOrdered).toLocaleTimeString()} subtitle={order?.price + ' ' + order?.currency}
            description={'Status: ' + order.status} screen='UserOrderDetails' params={{order}} navigation={navigation}
          />) : <Text style={styles.emptySection}>Vous n'avez aucune commande précédente.</Text>}
        </View>

      </ScrollView> : <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{...styles.title, padding: 0, margin: 0}}>Vous n'avez pas de commandes.</Text>
      </View>) : <View style={styles.container}><ActivityIndicator size={60} color='#56aadb'/></View>}

      {show && (Platform.OS === 'ios' ? <View style={styles.iosDateBackdrop}>
        <View style={styles.iosDateBg}>
          <DateTimePicker
            mode={mode}
            value={date}
            is24Hour={true}
            display='spinner'
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
      />)}

      <FAB style={styles.fab} animated label='Commander' icon='plus' color='white' onPress={handleNavigation}/>
    </View>
  );
}
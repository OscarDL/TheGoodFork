import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { CalendarList } from 'react-native-calendars';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Bookings from './Day/Bookings';
import MyBookings from './MyBookings';
import NewBooking from './New/Booking';
import { styles } from '../../../Reusables/Styles';


const Stack = createStackNavigator();
const iosH = CardStyleInterpolators.forHorizontalIOS;
const iosV = Platform.OS === 'ios' ? iosH : CardStyleInterpolators.forVerticalIOS;

export default function UserPlanning({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title}} name='UserPlanningComponent' component={UserPlanningComponent}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Réservations'}} name='Bookings' component={Bookings}/>
      <Stack.Screen options={{cardStyleInterpolator: iosV, title: 'Mes réservations'}} name='MyBookings' component={MyBookings}/>
      <Stack.Screen options={{cardStyleInterpolator: iosV, title: 'Nouvelle réservation'}} name='NewBooking' component={NewBooking}/>
    </Stack.Navigator>
  );
}

function UserPlanningComponent({navigation}) {
  return (
    <View style={styles.container}>
      <CalendarList
        pastScrollRange={1}
        futureScrollRange={12}
        scrollEnabled={true}
        showScrollIndicator={true}
        onDayPress={day => navigation.navigate('Bookings', {day})}
      />
      <FAB
        animated
        color='white'
        icon='calendar'
        style={styles.fab}
        label='Mes réservations'
        onPress={() => navigation.navigate('MyBookings')}
      />
    </View>
  );
}
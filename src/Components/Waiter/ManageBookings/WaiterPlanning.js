import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { Text, TouchableOpacity, View } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Bookings from './Day/Bookings';
import EditBooking from './Edit/EditBooking';
import BookingDetails from './BookingDetails';
import { styles } from '../../../Shared/styles';


const Stack = createStackNavigator();
const iosH = CardStyleInterpolators.forHorizontalIOS;


export default function WaiterPlanning() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title: 'Réservations'}} name='WaiterPlanningComponent' component={WaiterPlanningComponent}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Disponibilités'}} name='Bookings' component={Bookings}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Modifier réservation'}} name='EditBooking' component={EditBooking}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Détails réservation'}} name='BookingDetails' component={BookingDetails}/>
    </Stack.Navigator>
  );
}


function WaiterPlanningComponent({navigation}) {
  
  return (
    <View style={styles.container}>
      <CalendarList
        dayComponent={({date}) => {
          const day = new Date(date.timestamp).setHours(0,0,0,0);
          const now = new Date(Date.now()).setHours(0,0,0,0);

          return (
            <TouchableOpacity
              style={{minHeight: 34, padding: 10, justifyContent: 'center', alignItems: 'center', position: 'relative'}}
              onPress={() => {
                if (day < now) return null;
                return navigation.navigate('Bookings', {date});
              }}
            >
              <Text style={{
                textAlign: 'center',
                color: day < now ? '#aaa' : (day === now ? 'deepskyblue' : 'black')
              }}>
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
        
        firstDay={1}
        pastScrollRange={1}
        futureScrollRange={12}

        scrollEnabled={true}
        showScrollIndicator={true}
      />
    </View>
  );
}
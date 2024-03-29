import { FAB } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Text from '../../Shared/Text';
import Bookings from './Day/Bookings';
import EditBooking from './Edit/Edit';
import MyBookings from './Edit/MyBookings';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getBookings } from '../../../Functions/bookings';


const Stack = createStackNavigator();
const iosH = CardStyleInterpolators.forHorizontalIOS;
const iosV = Platform.OS === 'ios' ? iosH : CardStyleInterpolators.forVerticalIOS;

const getDay = (date) => new Date(new Date(date).setHours(0,0,0,0) - new Date().getTimezoneOffset() * 60000);

LocaleConfig.locales['fr'] = {
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
};

LocaleConfig.defaultLocale = 'fr';


export default function UserPlanning({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title}} name='UserPlanningComponent' component={UserPlanningComponent}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Disponibilités'}} name='Bookings' component={Bookings}/>
      <Stack.Screen options={{cardStyleInterpolator: iosV, title: 'Mes réservations'}} name='MyBookings' component={MyBookings}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Modifier réservation'}} name='EditBooking' component={EditBooking}/>
    </Stack.Navigator>
  );
}

function UserPlanningComponent({navigation}) {
  const isFocused = useIsFocused();
  const [bookings, setBookings] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    isFocused && getBookings().then(res => {
      if (!res.success) return setBookings({});

      const dates = {};
      res.bookings.forEach((booking, i) => {
        const day = getDay(booking.dateBooked).toISOString().slice(0,10);
        dates[day] = {marked: true, dotColor: day < getDay(Date.now()).toISOString().slice(0,10) ? 'orange' : 'limegreen'};
      });

      setMarkedDates(dates);
      setBookings(res.bookings);
    });
  }, [isFocused, setBookings, setMarkedDates]);


  return (
    <View style={styles.container}>
      {bookings ? <>
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
                }}>{date.day}</Text>

                {date.dateString in markedDates
                  &&
                <View style={{
                  position: 'absolute', bottom: 0, marginBottom: -10
                }}>
                  <Text style={{color: markedDates[date.dateString].dotColor, fontSize: 20}}>•</Text>
                </View>}
              </TouchableOpacity>
            );
          }}

          firstDay={1}
          pastScrollRange={1}
          futureScrollRange={12}
          markedDates={{...markedDates}} // dates don't update if simply using 'markedDates' and not '{...markedDates}

          scrollEnabled={true}
          showScrollIndicator={true}
        />
        <FAB
          color='white'
          icon='calendar'
          style={styles.fab}
          label='Mes réservations'
          onPress={() => navigation.navigate('MyBookings', {bookings})}
        />
      </> : <View style={styles.container}>
        <ActivityIndicator size={60} color={colors.accentPrimary}/>
      </View>}
    </View>
  );
}
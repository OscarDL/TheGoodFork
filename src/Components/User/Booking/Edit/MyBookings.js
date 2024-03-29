import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, ActivityIndicator, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BookingsTab from './Tab';
import { colors } from '../../../../Shared/colors';
import { styles } from '../../../../Shared/styles';
import { getBookings } from '../../../../Functions/bookings';


const Tabs = createMaterialTopTabNavigator();

const style = {
  pressColor: 'darkgrey',
  activeTintColor: colors.accentPrimary,
  labelStyle: {fontSize: 14, fontWeight: 'bold'},
  indicatorStyle: {backgroundColor: colors.accentSecondary}
};


export default function MyBookings({route}) {
  const isFocused = useIsFocused();
  const [bookings, setBookings] = useState(route.params.bookings ?? null);

  useEffect(() => {
    isFocused && getBookings().then(res => res.success && setBookings(res.bookings));
  }, [isFocused, setBookings]);

  
  return bookings ? (
    <Tabs.Navigator backBehavior='none' tabBarOptions={style} initialRouteName='A Venir'>
      <Tabs.Screen name='A Venir'>
        {props => <BookingsTab {...props} bookings={bookings.filter(booking => booking.dateBooked > Date.now())} future={true}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Historique'>
        {props => <BookingsTab {...props} bookings={bookings.filter(booking => booking.dateBooked < Date.now())} future={false}/>}
      </Tabs.Screen>
    </Tabs.Navigator>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={60} color={colors.accentPrimary}/>
    </View>
  );
}
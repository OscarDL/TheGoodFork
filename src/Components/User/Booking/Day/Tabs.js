import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BookingPeriod from './Period';
import { colors } from '../../../../Shared/colors';


const Tabs = createMaterialTopTabNavigator();

const style = {
  pressColor: 'darkgrey',
  activeTintColor: colors.accentPrimary,
  labelStyle: {fontSize: 14, fontWeight: 'bold'},
  indicatorStyle: {backgroundColor: colors.accentSecondary}
};


export default function SubmitOrderTabs({tables, bookings, setRefresh, day}) {
  return (
    <Tabs.Navigator
      backBehavior='none'
      tabBarOptions={style}
      initialRouteName='Matin'
    >
      <Tabs.Screen name='Matin'>
        {props => <BookingPeriod {...props} tables={tables} setRefresh={setRefresh} period={1}
          dateBooked={day} bookings={bookings.filter(booking => booking.period === 1)}
        />}
      </Tabs.Screen>
      <Tabs.Screen name='Midi'>
        {props => <BookingPeriod {...props} tables={tables} setRefresh={setRefresh} period={2}
          dateBooked={day} bookings={bookings.filter(booking => booking.period === 2)}
        />}
      </Tabs.Screen>
      <Tabs.Screen name='Apres Midi'>
        {props => <BookingPeriod {...props} tables={tables} setRefresh={setRefresh} period={3}
          dateBooked={day} bookings={bookings.filter(booking => booking.period === 3)}
        />}
      </Tabs.Screen>
      <Tabs.Screen name='Soir'>
        {props => <BookingPeriod {...props} tables={tables} setRefresh={setRefresh} period={4}
          dateBooked={day} bookings={bookings.filter(booking => booking.period === 4)}
        />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
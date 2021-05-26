import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BookingPeriod from './BookingPeriod';
import { colors } from '../../../../Shared/colors';


const Tabs = createMaterialTopTabNavigator();

const style = {
  pressColor: 'darkgrey',
  activeTintColor: colors.accentPrimary,
  labelStyle: {fontSize: 14, fontWeight: 'bold'},
  indicatorStyle: {backgroundColor: colors.accentSecondary}
};


export default function SubmitOrderTabs({tables, navigation, bookings, setRefresh, day}) {
  return (
    <Tabs.Navigator
      backBehavior='none'
      tabBarOptions={style}
      initialRouteName='Matin'
    >
      <Tabs.Screen name='Matin'>
        {props => <BookingPeriod {...props} navigation={navigation} tables={tables} bookings={bookings} setRefresh={setRefresh} dateBooked={day} period={1}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Midi'>
        {props => <BookingPeriod {...props} navigation={navigation} tables={tables} bookings={bookings} setRefresh={setRefresh} dateBooked={day} period={2}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Apres Midi'>
        {props => <BookingPeriod {...props} navigation={navigation} tables={tables} bookings={bookings} setRefresh={setRefresh} dateBooked={day} period={3}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Soir'>
        {props => <BookingPeriod {...props} navigation={navigation} tables={tables} bookings={bookings} setRefresh={setRefresh} dateBooked={day} period={4}/>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
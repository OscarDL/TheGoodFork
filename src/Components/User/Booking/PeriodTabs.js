import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BookingPeriod from './BookingPeriod';


const Tabs = createMaterialTopTabNavigator();

export default function SubmitOrderTabs({bookings}) {
  return (
    <Tabs.Navigator initialRouteName='Matin' backBehavior='initialRoute' tabBarOptions={{pressColor: 'darkgrey'}}>
      <Tabs.Screen name='Matin'>
        {props => <BookingPeriod {...props} bookings={bookings} period={1}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Midi'>
        {props => <BookingPeriod {...props} bookings={bookings} period={2}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Apres Midi'>
        {props => <BookingPeriod {...props} bookings={bookings} period={3}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Soir'>
        {props => <BookingPeriod {...props} bookings={bookings} period={4}/>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
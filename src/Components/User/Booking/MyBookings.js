import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, ActivityIndicator, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BookingsTab from './Edit/BookingsTab';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getBookings } from '../../../Functions/bookings';
import { useDataLayerValue } from '../../Context/DataLayer';


const Tabs = createMaterialTopTabNavigator();

const style = {
  pressColor: 'darkgrey',
  activeTintColor: colors.accentPrimary,
  labelStyle: {fontSize: 14, fontWeight: 'bold'},
  indicatorStyle: {backgroundColor: colors.accentSecondary}
};


export default function MyBookings({route}) {
  const isFocused = useIsFocused();
  const [{token}] = useDataLayerValue();
  const [bookings, setBookings] = useState(route.params.bookings ?? null);

  useEffect(() => {
    isFocused && getBookings(token).then(res => setBookings(res.bookings));
  }, [isFocused, setBookings]);

  return bookings ? (
    <Tabs.Navigator backBehavior='none' tabBarOptions={style} initialRouteName='A Venir'>
      <Tabs.Screen name='A Venir'>
        {props => <BookingsTab {...props} bookings={bookings} future={true}/>}
      </Tabs.Screen>
      <Tabs.Screen name='Historique'>
        {props => <BookingsTab {...props} bookings={bookings} future={false}/>}
      </Tabs.Screen>
    </Tabs.Navigator>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  );
}
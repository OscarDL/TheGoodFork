import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Platform, SafeAreaView, View } from 'react-native';

import PeriodTabs from './Tabs';
import { colors } from '../../../../Shared/colors';
import { styles } from '../../../../Shared/styles';
import { getTables } from '../../../../Functions/tables';
import { getDayBookings } from '../../../../Functions/bookings';
import { useDataLayerValue } from '../../../../Context/DataLayer';


export default function Bookings({navigation, route}) {
  const day = route.params.date.timestamp;
  
  const isFocused = useIsFocused();
  const [{token}] = useDataLayerValue();
  const [tables, setTables] = useState(null);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    isFocused && getDayBookings(day, token).then(bookings => (
      getTables(token).then(res => {
        setBookings(bookings);
        setTables(res.tables.amount);
      })
    ));
  }, [isFocused, setTables, setBookings]);

  
  return (
    <SafeAreaView style={styles.container}>
      {bookings ? <PeriodTabs tables={tables} bookings={bookings} navigation={navigation} day={day}/> : <View style={styles.container}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
      </View>}
    </SafeAreaView>
  );
}
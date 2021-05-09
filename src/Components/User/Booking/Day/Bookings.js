import { FAB } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';

import PeriodTabs from './PeriodTabs';
import { styles } from '../../../../Reusables/Styles';
import { useDataLayerValue } from '../../../Context/DataLayer';
import { getDayBookings } from '../../../../Functions/bookings';


export default function Bookings({navigation, route}) {
  const day = route.params.day.timestamp;
  
  const isFocused = useIsFocused();
  const [{token}] = useDataLayerValue();
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    isFocused && getDayBookings(day, token).then(bookings => setBookings(bookings));
  }, [isFocused, setBookings]);

  return (
    <SafeAreaView style={styles.container}>
      {bookings ? <>
        <PeriodTabs bookings={bookings}/>
        <FAB
          animated
          icon='plus'
          color='white'
          label='Réserver'
          style={styles.fab}
          onPress={() => navigation.navigate('NewBooking', {bookings, day})}
        />
      </> : <View style={styles.container}>
        <ActivityIndicator size={60} color='#56aadb'/>
      </View>}
    </SafeAreaView>
  );
}
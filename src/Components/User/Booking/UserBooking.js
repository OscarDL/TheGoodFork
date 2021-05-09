import { FAB } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';

import PeriodTabs from './PeriodTabs';
import { styles } from '../../../Reusables/Styles';
import { getDayBookings } from '../../../Functions/bookings';


export default function UserBooking({navigation, route}) {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    getDayBookings(route.params.day.timestamp).then(bookings => setBookings(bookings));
  }, [setBookings]);

  return (
    <SafeAreaView style={styles.container}>
      {bookings ? <>
        <PeriodTabs bookings={bookings}/>
        <FAB style={styles.fab} animated label='Réserver' icon='plus' color='white' onPress={() => navigation.navigate('UserNewBooking')}/>
      </> : <View style={styles.container}>
        <ActivityIndicator size={60} color='#56aadb'/>
      </View>}
    </SafeAreaView>
  );
}
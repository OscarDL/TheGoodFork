import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { styles } from '../../../Reusables/Styles';


export default function BookingPeriod({bookings, period}) {
  return (
    <SafeAreaView style={styles.container}>
      {bookings?.map(booking => {
        booking.period === period && <Text>
          {booking.dateBooked}
        </Text>
      })}
    </SafeAreaView>
  );
}

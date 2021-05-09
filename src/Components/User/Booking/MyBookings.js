import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import { getBookings } from '../../../Functions/bookings';
import { useDataLayerValue } from '../../Context/DataLayer';


export default function MyBookings() {
  const [{token}] = useDataLayerValue();
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    getBookings(token).then(res => setBookings(res.bookings));
  }, [setBookings]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>

        <Text style={styles.title}>A venir</Text>
        {bookings && bookings?.map((booking, i) => // filter by date comparing after today
        <Text key={i}>
          {booking.dateBooked + ' ' + booking.period + ' ' + booking.table}
        </Text>)}

        <Text style={styles.title}>Précédemment</Text>
        {bookings && bookings?.map((booking, i) => // filter by date comparing before today
        <Text key={i}>
          {booking.dateBooked + ' ' + booking.period + ' ' + booking.table}
        </Text>)}

      </ScrollView>
    </View>
  );
}
import React from 'react';
import { Icon } from 'react-native-elements';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { styles } from '../../../../Shared/styles';


export default function BookingPeriod({tables, bookings, dateBooked, period, navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {Array.from(Array(tables), (_, i) => i + 1).map(table => {
          const booking = bookings.filter(booking => booking.table === table && booking.period === period);
          return (
            <TouchableOpacity
              key={table}
              style={{...styles.bookingRow, paddingVertical: 16}}
              onPress={() => booking.length ? (
                navigation.navigate('EditBooking', {booking: booking[0]})
              ) : (
                navigation.navigate('BookingDetails', {booking: {dateBooked, period, table}})
              )}
            >
              <Text style={{fontSize: 16}}>Table {table}</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16, color: booking.length ? '#f22' : '#2b4'}}>
                  {booking.length ? 'RÉSERVÉE' : 'DISPONIBLE'}
                </Text>
                <Icon name='chevron-right' style={{marginLeft: 8}} color='grey' />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
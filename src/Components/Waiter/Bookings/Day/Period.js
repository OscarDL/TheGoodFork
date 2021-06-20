import React from 'react';
import { Icon } from 'react-native-elements';
import { ScrollView, View, TouchableOpacity } from 'react-native';

import Text from '../../../Shared/Text';
import { colors } from '../../../../Shared/colors';
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
                navigation.navigate('WaiterEditBooking', {booking: booking[0]})
              ) : (
                navigation.navigate('WaiterNewBooking', {booking: {dateBooked, period, table}})
              )}
            >
              <Text style={{fontSize: 16}}>Table {table}</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16, color: booking.length ? colors.red : colors.green}}>
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
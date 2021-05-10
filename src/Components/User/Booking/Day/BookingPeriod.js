import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { styles } from '../../../../Reusables/Styles';


export default function BookingPeriod({bookings, period}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {[1,2,3,4,5,6,7,8,9,10].map(table => (
          <View key={table} style={{
            paddingVertical: 20,
            marginHorizontal: 20,
            flexDirection: 'row',
            borderBottomColor: '#805a48',
            justifyContent: 'space-between',
            borderBottomWidth: table === 10 ? 0 : 0.5
          }}>
            <Text style={{fontSize: 16}}>Table {table}</Text>

            {bookings.filter(booking => booking.table === table && booking.period === period).length
              ?
            <Text style={{fontSize: 16, color: '#f22'}}>RÉSERVÉE</Text>
              :
            <Text style={{fontSize: 16, color: '#2b4'}}>DISPONIBLE</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

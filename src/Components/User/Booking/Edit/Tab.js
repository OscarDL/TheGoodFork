import React from 'react';
import { View, ScrollView } from 'react-native';

import Text from '../../../Shared/Text';
import TouchCard from '../../../Shared/TouchCard';
import { styles } from '../../../../Shared/styles';
import { getPeriod } from '../../../../Functions/utils';


const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const months = ['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];


export default function BookingsTab({navigation, bookings, future}) {
  return (
    <View style={styles.container}>
      {bookings.length
        ?
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        {bookings
          .filter(booking => future ? booking.dateBooked > Date.now() : booking.dateBooked < Date.now())
          .sort((a, b) => String(a.dateBooked + a.table).localeCompare(b.dateBooked + b.table)) // append table to sort by table too
          .map((booking, i) => {
            const date = new Date(booking.dateBooked);
            return <TouchCard
              key={i} icon='book-online' title={`${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`}
              subtitle={'Période : ' + getPeriod(booking.period).toUpperCase()} description={'Table : N°' + booking.table}
              screen='EditBooking' navigation={future ? navigation : null} params={{booking}} // can edit future bookings only
            />})
          }
      </ScrollView>
        :
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20, textAlign: 'center', lineHeight: 32}}>
          Vous n'avez pas de réservations {future ? 'à venir' : 'précédentes'}.
        </Text>
      </View>}
    </View>
  );
}

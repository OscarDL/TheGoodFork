import React from 'react';
import { View, ScrollView, Text } from 'react-native';

import BaseCard from '../../../../Reusables/BaseCard';
import { styles } from '../../../../Reusables/Styles';
import { getPeriod } from '../../../../Functions/utils';


const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const months = ['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];


export default function BookingsTab({navigation, bookings, future}) {
  return (
    <View style={styles.container}>
      {bookings?.filter(booking => future ? booking.dateBooked > Date.now() : booking.dateBooked < Date.now()).length
        ?
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        {bookings
          .filter(booking => future ? booking.dateBooked > Date.now() : booking.dateBooked < Date.now())
          .sort((a, b) => a.dateBooked > b.dateBooked)
          .map((booking, i) => {
            const date = new Date(booking.dateBooked);
            return <BaseCard
              key={i} icon='book-online' title={`${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`}
              subtitle={'Période : ' + getPeriod(booking.period).toUpperCase()} description={'Table : N°' + booking.table}
              screen='EditBooking' navigation={future ? navigation : null} params={{bookings, booking}}
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

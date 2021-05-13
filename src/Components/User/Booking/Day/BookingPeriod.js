import React from 'react';
import { Icon } from 'react-native-elements';
import { ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';

import { styles } from '../../../../Reusables/Styles';
import { getPeriod } from '../../../../Functions/utils';
import { submitBooking } from '../../../../Functions/bookings';
import { useDataLayerValue } from '../../../Context/DataLayer';


const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const months = ['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];


export default function BookingPeriod({bookings, setRefresh, dateBooked, period}) {
  const [{user, token}] = useDataLayerValue();
  
  const handleSubmit = (table) => {
    const booking = {user, table, period, dateBooked};

    const day = new Date(dateBooked).getDate();
    const month = months[new Date(dateBooked).getMonth()];

    Alert.alert(
      `${days[new Date(dateBooked).getDay()]} ${day} ${month}`,
      `Voulez-vous réserver la table ${table} ${(period === 3 ? "dans l'" : 'au ')}${getPeriod(period)} ?`,
      [{
        text: 'Annuler'
      },
      {
        text: 'Réserver',
        onPress: () => submitBooking(booking, token).then(res => {
          res.success && setRefresh(true);
          Alert.alert(
            res.success ? res.title : 'Erreur de réservation',
            res.success ? res.desc : res,
            [{
              text: res.success ? 'Terminé' : 'Réesayer',
              onPress: () => res.success ? null : handleSubmit(table)
            }]
          );
        })
      }]
    ) 
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {[1,2,3,4,5,6,7,8,9,10].map(table => (
          <View key={table} style={styles.bookingRow}>
            <Text style={{fontSize: 16}}>Table {table}</Text>

            {bookings.filter(booking => booking.table === table && booking.period === period).length
              ?
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: -12
            }}>
              <Text style={{fontSize: 16, color: '#f22'}}>RÉSERVÉE</Text>
              <TouchableOpacity style={{padding: 12}} disabled>
                <Icon name='add-circle-outline' color='#28d' style={{opacity: 0.5}}/>
              </TouchableOpacity>
            </View>
              :
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: -12
            }}>
              <Text style={{fontSize: 16, color: '#2b4'}}>DISPONIBLE</Text>
              <TouchableOpacity onPress={() => handleSubmit(table)} style={{padding: 12}}>
                <Icon name='add-circle-outline' color='#28d'/>
              </TouchableOpacity>
            </View>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

import React from 'react';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { ScrollView, View, TouchableOpacity, Alert, Platform } from 'react-native';

import Text from '../../../Shared/Text';
import { colors } from '../../../../Shared/colors';
import { styles } from '../../../../Shared/styles';
import { getPeriod } from '../../../../Functions/utils';
import { newBooking } from '../../../../Functions/bookings';
import { useAuthContext } from '../../../../Context/Auth/Provider';


const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const months = ['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];


export default function BookingPeriod({tables, bookings, setRefresh, dateBooked, period}) {
  const [{user}] = useAuthContext();
  
  const handleSubmit = (table) => {
    const booking = {user, table, period, dateBooked};

    const day = new Date(dateBooked).getDate();
    const month = months[new Date(dateBooked).getMonth()];

    const actions = [
      {
        text: 'Réserver',
        onPress: () => newBooking(booking).then(res => {
          Toast.show({
            text1: res.title ?? 'Erreur de réservation',
            text2: res.desc ?? res,
            
            position: 'bottom',
            visibilityTime: 1500,
            type: res.success ? 'success' : 'error'
          });
          res.success && setRefresh(true);
        })
      }, {
        text: 'Annuler',
        style: 'cancel'
      }
    ];

    Alert.alert(
      `${days[new Date(dateBooked).getDay()]} ${day} ${month}`,
      `Voulez-vous réserver la table ${table} ${(period === 3 ? "dans l'" : 'au ')}${getPeriod(period)} ?`,
      Platform.OS === 'ios' ? actions : actions.reverse()
    ) 
  };
  

  return (
    <View style={styles.container}>
      <ScrollView>
        {Array.from(Array(tables), (_, i) => i + 1).map(table => (
          <View key={table} style={styles.bookingRow}>
            <Text style={{fontSize: 16}}>Table {table}</Text>

            {bookings.filter(booking => booking.table === table).length
              ?
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: -12
            }}>
              <Text style={{fontSize: 16, color: colors.red}}>RÉSERVÉE</Text>
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
              <Text style={{fontSize: 16, color: colors.green}}>DISPONIBLE</Text>
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

import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';

import { styles } from '../../../Shared/styles';
import { getPeriod } from '../../../Functions/utils';
import { newBooking } from '../../../Functions/bookings';
import { useDataLayerValue } from '../../Context/DataLayer';


const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const months = ['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];


export default function BookingDetails({navigation, route}) {
  const {booking} = route.params;
  const [{token}] = useDataLayerValue();
  
  const [customer, setCustomer] = useState({
    firstName: null,
    lastName: null,
    email: null
  });
  

  const handleSubmit = () => (
    newBooking({...booking, user: customer}, token).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de réservation',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && navigation.goBack();
    })
  );


  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 18}}>Jour : {
          days[new Date(booking.dateBooked).getDay()] + ' '
          + new Date(booking.dateBooked).getDate() + ' ' +
          months[new Date(booking.dateBooked).getMonth()]
        }</Text>
        <Text style={{fontSize: 18}}>Période : {getPeriod(booking.period) + '\u2000\u2013\u2000'}table {booking.table}</Text>
      </View>

      <View>
        <Text style={styles.sectionText}>Détails : client</Text>
        <View style={{marginTop: 12}}>
          <Input placeholder='Prénom' onChangeText={firstName => setCustomer({...customer, firstName})}/>
          <Input placeholder='Nom' onChangeText={lastName => setCustomer({...customer, lastName})}/>
          <Input placeholder='Adresse email' keyboardType='email-address' autoCapitalize='none' onChangeText={email => setCustomer({...customer, email})}/>
        </View>
      </View>

      <Button
        icon={<Icon
          color='white'
          name='book-online'
          style={{marginRight: 10}}
        />}
        title='Réserver'
        onPress={handleSubmit}
        buttonStyle={[{...styles.button, alignSelf: 'center'}]}
      />
    </KeyboardAvoidingView>
  );
}

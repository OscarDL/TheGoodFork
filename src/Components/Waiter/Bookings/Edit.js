import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, Alert, Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getTables } from '../../../Functions/tables';
import { useAuthContext } from '../../../Context/Auth/Provider';
import TablePicker from '../../../Shared/Components/Bookings/TablePicker';
import PeriodPicker from '../../../Shared/Components/Bookings/PeriodPicker';
import { getDayBookings, editBooking, deleteBooking } from '../../../Functions/bookings';


const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const months = ['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

const circle = {
  width: '100%',
  height: '100%',
  borderRadius: 100,
  justifyContent: 'center',
};

const circleZone = {
  alignItems: 'center', 
  width: Dimensions.get('window').width * 0.3,
  height: Dimensions.get('window').width * 0.3
};


export default function UserNewBooking({navigation, route}) {
  const [{token}] = useAuthContext();

  const [step, setStep] = useState(3);
  const [show, setShow] = useState(null);
  
  const [tables, setTables] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState(null);
  const [booking, setBooking] = useState(route.params.booking);
  
  useEffect(() => {
    getDayBookings(booking.dateBooked, token).then(bookings => (
      getTables(token).then(res => {
        setLoading(false);
        setBookings(bookings);
        setTables(res.tables.amount);
      })
    ));
  }, [setTables, setLoading, setBookings]);


  const androidChange = (e) => {
    if (e.type === 'dismissed' || e.nativeEvent.timestamp === booking.dateBooked) return setShow(null);

    setShow(null);
    setLoading(true);
    setBooking({ ...booking, dateBooked: e.nativeEvent.timestamp });

    getDayBookings(e.nativeEvent.timestamp, token).then(bookings => {
      setStep(1);
      setLoading(false);
      setBookings(bookings);
    });
  };

  const iosChange = () => {
    setShow(null);
    setLoading(true);

    getDayBookings(booking.dateBooked, token).then(bookings => {
      setStep(1);
      setLoading(false);
      setBookings(bookings);
    });
  };

  const handleEdit = () => {
    editBooking(booking, token).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de modification',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && navigation.goBack();
    });
  };

  const handleCancel = () => {
    const day = new Date(booking.dateBooked);

    const actions = [
      {
        text: 'Continuer',
        style: 'destructive',
        onPress: () => deleteBooking(booking, token).then(res => {
          Toast.show({
            text1: res.title ?? "Erreur d'annulation",
            text2: res.desc ?? res,
            
            position: 'bottom',
            visibilityTime: 1500,
            type: res.success ? 'success' : 'error'
          });
          res.success && navigation.goBack();
        })
      }, {
        text: 'Revenir',
        style: 'cancel'
      }
    ];

    Alert.alert(
      'Annulation',
      "Vous êtes sur le point d'annuler la réservation de "
      + `${booking.user.firstName} ${booking.user.lastName}, le `
      + `${days[day.getDay()]} ${day.getDate()} ${months[day.getMonth()]}. Continuer ?`,
      Platform.OS === 'ios' ? actions : actions.reverse()
    );
  };


  return (
    <View style={{...styles.container, justifyContent: 'space-around'}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{...styles.title, marginTop: 0}}>
          {step > 2 ? 'Réservation valide !' : 'Sélectionnez une ' + (step === 1 ? 'période' : 'table')}
        </Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          style={circleZone}
          activeOpacity={0.66}
          onPress={() => setShow(0)}
        >
          <View style={{...circle, backgroundColor: step > 0 ? colors.green : colors.yellow}}>
            <Icon name={step > 0 ? 'event-available' : 'event-busy'} color='white' size={48}/>
          </View>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 16}}>Date</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={circleZone}
          activeOpacity={0.66}
          onPress={() => setShow(1)}
        >
          <View style={{...circle, backgroundColor: step > 1 ? colors.green : colors.yellow}}>
            <Icon name={step > 1 ? 'schedule' : 'more-time'} color='white' size={48}/>
          </View>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 16}}>Période</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={circleZone}
          disabled={step < 2}
          activeOpacity={0.66}
          onPress={() => setShow(2)}
        >
          <View style={{...circle, opacity: step > 1 ? 1 : 0.5, backgroundColor: step > 2 ? colors.green : colors.yellow}}>
            <Icon name={step > 2 ? 'restaurant' : 'no-meals'} color='white' size={48}/>
          </View>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 16}}>Table</Text>
        </TouchableOpacity>
      </View>

      {show === 0 && (Platform.OS === 'ios' ? <View style={styles.iosDateBackdrop}>
        <View style={styles.iosDateBg}>
          <DateTimePicker
            mode='date'
            is24Hour={true}
            display='spinner'
            textColor='black'
            value={new Date(booking.dateBooked)}
            minimumDate={new Date(Date.now()).setHours(0,0,0,0)}
            onChange={e => setBooking({ ...booking, dateBooked: e.nativeEvent.timestamp })}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => setShow(null)}>
              <Text style={{padding: 24, color: colors.red, fontSize: 18}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={iosChange}>
              <Text style={{padding: 24, color: colors.blue, fontWeight: '500', fontSize: 18}}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> : <DateTimePicker
        mode='date'
        is24Hour={true}
        display='default'
        onChange={androidChange}
        value={new Date(booking.dateBooked)}
        minimumDate={new Date(Date.now()).setHours(0,0,0,0)}
      />)}

      {show === 1 && <PeriodPicker
        setStep={setStep}
        setShow={setShow}
        booking={booking}
        bookings={bookings}
        setBooking={setBooking}
      />}

      {show === 2 && <TablePicker
        tables={tables}
        setStep={setStep}
        setShow={setShow}
        booking={booking}
        bookings={bookings}
        setBooking={setBooking}
      />}

      {loading && <View style={{...styles.container, ...styles.iosDateBackdrop, justifyContent: 'center'}}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
      </View>}

      <View style={{alignItems: 'center'}}>
        <Button
          icon={<Icon
            name='save'
            color='white'
            style={{marginRight: 10}}
          />}
          title='Modifier'
          disabled={step < 3}
          onPress={handleEdit}
          buttonStyle={styles.button}
        />
        <TouchableOpacity style={{alignItems: 'center', padding: 10, marginTop: 20}} onPress={handleCancel}>
          <Text style={styles.delete}>Annuler cette réservation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, Alert, Dimensions, Platform, TouchableOpacity, View } from 'react-native';

import Text from '../../../Shared/Text';
import { colors } from '../../../../Shared/colors';
import { styles } from '../../../../Shared/styles';
import { getPeriod } from '../../../../Functions/utils';
import { getTables } from '../../../../Functions/tables';
import TablePicker from '../../../Shared/Bookings/TablePicker';
import PeriodPicker from '../../../Shared/Bookings/PeriodPicker';
import { getDayBookings, editBooking, deleteBooking } from '../../../../Functions/bookings';


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

const failureAlert = (error, navigation, setRetry) => {
  const actions = [
    {
      text: 'Réessayer',
      onPress: () => setRetry(true)
    }, {
      text: 'Annuler',
      style: 'cancel',
      onPress: () => navigation.goBack()
    }
  ];

  Alert.alert(
    'Erreur de chargement des tables', error,
    Platform.OS === 'ios' ? actions : actions.reverse()
  );
};


export default function UserNewBooking({navigation, route}) {
  const [show, setShow] = useState(0);
  const [step, setStep] = useState(3);
  
  const [retry, setRetry] = useState(true);
  const [tables, setTables] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState(null);
  const [booking, setBooking] = useState(route.params.booking);
  
  useEffect(() => {
    retry && getDayBookings(booking.dateBooked).then(async (bookRes) => {
      setRetry(false);
      let error = null;

      if (!bookRes.success)
        error = bookRes;
      else {
        const tableRes = await getTables();
        if (!tableRes.success)
          error = tableRes;
        else {
          setBookings(bookRes.bookings);
          setTables(tableRes.tables.amount);
        }
      }

      setLoading(false);
      error && failureAlert(error, navigation, setRetry);
    });
  }, [retry, setRetry, setTables, setLoading, setBookings]);


  const androidChange = (e) => {
    if (e.type === 'dismissed' || new Date(e.nativeEvent.timestamp).getTime() === booking.dateBooked) return setShow(0);

    setShow(0);
    setLoading(true);
    setBooking({ ...booking, dateBooked: new Date(e.nativeEvent.timestamp).getTime() });
    
    getDayBookings(new Date(e.nativeEvent.timestamp).getTime()).then(res => {
      setStep(1);
      setLoading(false);
      setBookings(res.bookings);
    });
  };

  const iosChange = () => {
    setShow(0);
    setLoading(true);

    getDayBookings(new Date(booking.dateBooked).getTime()).then(res => {
      setStep(1);
      setLoading(false);
      setBookings(res.bookings);
    });
  };

  const handleEdit = () => {
    editBooking(booking).then(res => {
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
        onPress: () => deleteBooking(booking).then(res => {
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
        text: 'Annuler',
        style: 'cancel'
      }
    ];

    Alert.alert(
      'Êtes-vous sûr ?',
      "Vous êtes sur le point d'annuler votre réservation du "
      + `${days[day.getDay()]} ${day.getDate()} ${months[day.getMonth()]} `
      + `${booking.period === 3 ? "dans l'" : "au "}` + getPeriod(booking.period) + '.',
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
          onPress={() => setShow(1)}
        >
          <View style={{...circle, backgroundColor: step > 0 ? colors.green : colors.yellow}}>
            <Icon name={step > 0 ? 'event-available' : 'event-busy'} color='white' size={48}/>
          </View>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 16}}>
            {`${days[new Date(booking.dateBooked).getDay()]} ${new Date(booking.dateBooked).getDate()} ${months[new Date(booking.dateBooked).getMonth()]}`}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={circleZone}
          activeOpacity={0.66}
          onPress={() => setShow(2)}
        >
          <View style={{...circle, backgroundColor: step > 1 ? colors.green : colors.yellow}}>
            <Icon name={step > 1 ? 'schedule' : 'more-time'} color='white' size={48}/>
          </View>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 16, textTransform: 'capitalize'}}>
            {step > 1 ? getPeriod(booking.period) : 'Période'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={circleZone}
          disabled={step < 2}
          activeOpacity={0.66}
          onPress={() => setShow(3)}
        >
          <View style={{...circle, opacity: step > 1 ? 1 : 0.5, backgroundColor: step > 2 ? colors.green : colors.yellow}}>
            <Icon name={step > 2 ? 'restaurant' : 'no-meals'} color='white' size={48}/>
          </View>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 16}}>
            {'Table' + (step > 2 ? ` : ${booking.table}` : '')}
          </Text>
        </TouchableOpacity>
      </View>

      {show === 1 && (Platform.OS === 'ios' ? <View style={styles.iosDateBackdrop}>
        <View style={styles.iosDateBg}>
          <DateTimePicker
            mode='date'
            is24Hour={true}
            display='spinner'
            textColor='black'
            value={new Date(booking.dateBooked)}
            minimumDate={new Date(Date.now()).setHours(0,0,0,0)}
            onChange={e => setBooking({...booking, dateBooked: new Date(e.nativeEvent.timestamp).getTime()})}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
            <TouchableOpacity style={{width: '50%'}} onPress={() => setShow(0)}>
              <Text style={{padding: 24, color: colors.red, fontSize: 18, textAlign: 'center'}}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '50%'}} onPress={iosChange}>
              <Text style={{padding: 24, color: colors.blue, fontWeight: '500', fontSize: 18, textAlign: 'center'}}>Terminé</Text>
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

      {show === 2 && <PeriodPicker
        setStep={setStep}
        setShow={setShow}
        booking={booking}
        bookings={bookings}
        setBooking={setBooking}
      />}

      {show === 3 && <TablePicker
        tables={tables}
        setStep={setStep}
        setShow={setShow}
        booking={booking}
        bookings={bookings}
        setBooking={setBooking}
      />}

      {loading && <View style={{...styles.container, ...styles.iosDateBackdrop, justifyContent: 'center'}}>
        <ActivityIndicator size={60} color={colors.accentPrimary}/>
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
          <Text style={styles.delete}>Annuler ma réservation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
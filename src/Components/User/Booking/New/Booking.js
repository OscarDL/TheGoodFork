import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, Alert, Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';

import TablePicker from './TablePicker';
import PeriodPicker from './PeriodPicker';
import { styles } from '../../../../Reusables/Styles';
import { useDataLayerValue } from '../../../Context/DataLayer';
import { getDayBookings, submitBooking } from '../../../../Functions/bookings';


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
  const day = route.params.day;
  const [{user, token}] = useDataLayerValue();

  const [step, setStep] = useState(1);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState(route.params.bookings);

  const [booking, setBooking] = useState({
    user,
    period: 1,
    table: null,
    dateBooked: day
  });


  const androidChange = (e) => {
    if (e.type === 'dismissed' || e.nativeEvent.timestamp === booking.dateBooked) return setShow(null);

    setShow(null);
    setLoading(true);
    setBooking({ ...booking, dateBooked: e.nativeEvent.timestamp });

    getDayBookings(e.nativeEvent.timestamp, token).then(bookings => {
      setStep(1);
      setBookings(bookings);
      setTimeout(() => setLoading(false), 500);
    });
  };

  const iosChange = () => {
    setShow(null);
    setLoading(true);

    getDayBookings(booking.dateBooked, token).then(bookings => {
      setStep(1);
      setBookings(bookings);
      setTimeout(() => setLoading(false), 500);
    });
  };


  const handleSubmit = () => {
    submitBooking(booking, token).then(res => Alert.alert(
      res.success ? res.title : 'Erreur de réservation',
      res.success ? res.desc : res,
      [{
        text: res.success ? 'Terminé' : 'Réesayer',
        onPress: () => res.success ? navigation.goBack() : null
      }]
    ));
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
          <View style={{...circle, backgroundColor: step > 0 ? '#2b4d' : '#ea0'}}>
            <Icon name={step > 0 ? 'event-available' : 'event-busy'} color='white' size={48}/>
          </View>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 16}}>Date</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={circleZone}
          activeOpacity={0.66}
          onPress={() => setShow(1)}
        >
          <View style={{...circle, backgroundColor: step > 1 ? '#2b4d' : '#ea0'}}>
            <Icon name={step > 1 ? 'schedule' : 'more-time'} color='white' size={48}/>
          </View>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 16}}>Périodes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={circleZone}
          disabled={step < 2}
          activeOpacity={0.66}
          onPress={() => setShow(2)}
        >
          <View style={{...circle, opacity: step > 1 ? 1 : 0.5, backgroundColor: step > 2 ? '#2b4d' : '#ea0'}}>
            <Icon name={step > 2 ? 'restaurant' : 'no-meals'} color='white' size={48}/>
          </View>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 16}}>Tables</Text>
        </TouchableOpacity>
      </View>

      {show === 0 && (Platform.OS === 'ios' ? <View style={styles.iosDateBackdrop}>
        <View style={styles.iosDateBg}>
          <DateTimePicker
            mode='date'
            is24Hour={true}
            display='spinner'
            value={new Date(booking.dateBooked)}
            onChange={e => setBooking({ ...booking, dateBooked: e.nativeEvent.timestamp })}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => setShow(null)}>
              <Text style={{padding: 24, color: '#f22', fontSize: 18}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={iosChange}>
              <Text style={{padding: 24, color: '#28f', fontWeight: '500', fontSize: 18}}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> : <DateTimePicker
        mode='date'
        is24Hour={true}
        display='default'
        onChange={androidChange}
        value={new Date(booking.dateBooked)}
      />)}

      {show === 1 && <PeriodPicker
        setStep={setStep}
        setShow={setShow}
        booking={booking}
        bookings={bookings}
        setBooking={setBooking}
      />}

      {show === 2 && <TablePicker
        setStep={setStep}
        setShow={setShow}
        booking={booking}
        bookings={bookings}
        setBooking={setBooking}
      />}

      {loading && <View style={{...styles.container, ...styles.iosDateBackdrop, justifyContent: 'center'}}>
        <ActivityIndicator size={60} color='#56aadb'/>
      </View>}

      <View style={{alignItems: 'center'}}>
        <Button buttonStyle={styles.button} title="Réserver ma table" disabled={step < 3} onPress={handleSubmit}/>
      </View>
    </View>
  );
}
import React, { useState } from 'react';
import Picker from 'react-native-picker-select';
import { Button, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dimensions, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import { submitBooking } from '../../../Functions/bookings';
import { useDataLayerValue } from '../../Context/DataLayer';


const circle = {
  borderRadius: 100,
  alignItems: 'center',
  justifyContent: 'center',
  width: Dimensions.get('window').width * 0.3,
  height: Dimensions.get('window').width * 0.3
};

const pickerStyle = {
  inputIOS: {
    height: '100%',
    marginLeft: 12,
    marginRight: 28
  },
  inputAndroid: {
    height: '100%',
    marginRight: 20
  },
  iconContainer: {
    padding: 6,
    height: '100%'
  }
};

export default function UserNewBooking() {
  const [{user, token}] = useDataLayerValue();

  const [step, setStep] = useState(0);
  const [show, setShow] = useState(null);
  const [booking, setBooking] = useState({
    user,
    dateBooked: Date.now(),
    period: null,
    table: null
  });


  const androidChange = (e) => {
    setShow(null);
    if (e.type === 'dismissed') return;

    setBooking({ ...booking, dateBooked: e.nativeEvent.timestamp });
    if (step === 0) setStep(1);

    /*submitBooking(booking, token).then(res => {
      console.log(res);
    });*/
  };

  const iosChange = () => {
    setShow(null);
    if (step === 0) setStep(1);

    /*submitBooking(booking, token).then(res => {
      console.log(res);
    });*/
  };

  const iosCancel = () => {
    setShow(null);
    setBooking({ ...booking, dateBooked: Date.now() });
  };


  return (
    <SafeAreaView style={{...styles.container, justifyContent: 'space-around'}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{...styles.title, marginTop: 0}}>
          {step > 2 ? 'Réservation valide !' : 'Sélectionnez une ' + (step === 0 ? 'date' : (step === 1 ? 'période' : 'table'))}
        </Text>
      </View>

      {console.log(booking)}

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          activeOpacity={0.66}
          onPress={() => setShow(0)}
          style={{...circle, backgroundColor: step > 0 ? '#2b4d' : '#ea0'}}
        >
          <Icon name={step > 0 ? 'event-available' : 'event-busy'} color='white' size={48}/>
        </TouchableOpacity>
        
        <TouchableOpacity
          activeOpacity={0.66}
          disabled={step < 1}
          onPress={() => setShow(1)}
          style={{...circle, opacity: step < 1 ? 0.5 : 1, backgroundColor: step > 1 ? '#2b4d' : '#ea0'}}
        >
          <Icon name={step > 1 ? 'schedule' : 'more-time'} color='white' size={48}/>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={step < 2}
          activeOpacity={0.66}
          onPress={() => setShow(2)}
          style={{...circle, opacity: step < 2 ? 0.5 : 1, backgroundColor: step > 2 ? '#2b4d' : '#ea0'}}
        >
          <Icon name={step > 2 ? 'restaurant' : 'no-meals'} color='white' size={48}/>
        </TouchableOpacity>
      </View>

      {show === 0 && (Platform.OS === 'ios' ? <View style={styles.iosDateBackdrop}>
        <View style={styles.iosDateBg}>
          <DateTimePicker
            mode="date"
            is24Hour={true}
            display='spinner'
            value={new Date(booking.dateBooked)}
            onChange={e => setBooking({ ...booking, dateBooked: e.nativeEvent.timestamp })}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={iosCancel}>
              <Text style={{padding: 24, color: '#f22', fontSize: 18}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={iosChange}>
              <Text style={{padding: 24, color: '#28f', fontWeight: '500', fontSize: 18}}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> : <DateTimePicker
        mode="date"
        is24Hour={true}
        display='default'
        onChange={androidChange}
        value={new Date(booking.dateBooked)}
      />)}

      {show === 1 && <View style={{...styles.iosDateBackdrop, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height: 200, width: '90%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around'}}>
          <View style={styles.pickerView}>
            <Picker
              onValueChange={period => {
                setBooking({ ...booking, period });
                setStep(2);
              }}
              items={[
                { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Matin', value: 1, key: 0 },
                { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Midi', value: 2, key: 1 },
                { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Après-Midi', value: 3, key: 2 },
                { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Soir', value: 4, key: 3 }
              ]}
              value={2}
              placeholder={{}}
              style={pickerStyle}
              Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
            />
          </View>
        </View>
      </View>}

      <View style={{alignItems: 'center'}}>
        <Button buttonStyle={styles.button} title="Réserver ma table" disabled={step < 3}/>
      </View>
    </SafeAreaView>
  );
}
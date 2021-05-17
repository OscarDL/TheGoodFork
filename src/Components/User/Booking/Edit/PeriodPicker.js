import React from 'react';
import { Icon } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import { View, Text, Platform, TouchableOpacity } from 'react-native';

import { styles } from '../../../../Shared/styles';
import { totalTables } from '../../../../../config';


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

const pickerBg = {
  height: 200,
  width: '90%',
  paddingTop: 20,
  alignItems: 'center',
  backgroundColor: 'white',
  justifyContent: 'space-between',
  borderRadius: Platform.OS === 'ios' ? 10 : 5
};


export default function PeriodPicker({setStep, setShow, booking, bookings, setBooking}) {
  return (
    <View style={{...styles.iosDateBackdrop, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.25)'}}>
      <View style={pickerBg}>
        <View style={styles.pickerView}>
          <Picker
            items={[
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Matin', value: 1, key: 0 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Midi', value: 2, key: 1 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Après-Midi', value: 3, key: 2 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Soir', value: 4, key: 3 }
            ]}
            placeholder={{}}
            style={pickerStyle}
            value={booking.period}
            onValueChange={period => setBooking({ ...booking, period })}
            Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
          <TouchableOpacity onPress={() => setShow(null)}>
            <Text style={{color: '#f22', fontSize: 18, padding: 20}}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setStep(2);
            setShow(null);

            console.log(bookings);

            const tables = Array.from(Array(totalTables), (_, i) => i + 1);
            bookings
              .filter(thisBooking => thisBooking.period === booking.period)
              .forEach(thisBooking => tables.splice(tables.indexOf(thisBooking.table), 1));
              
            // Select lowest available table by default to avoid submit error
            setBooking({ ...booking, table: Math.min(...tables) });
          }}>
            <Text style={{color: '#28f', fontSize: 18, padding: 20}}>Terminé</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
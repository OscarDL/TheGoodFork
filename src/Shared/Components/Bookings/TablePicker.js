import React from 'react';
import { Icon } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import { View, Text, Platform, TouchableOpacity } from 'react-native';

import { colors } from '../../colors';
import { styles } from '../../styles';


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


export default function TablePicker({tables, setStep, setShow, booking, bookings, setBooking}) {
  const total = Array.from(Array(tables), (_, i) => ( // Tables picker list initialization
    { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table ' + (i + 1), value: i + 1, key: i }
  ));

  return (
    <View style={{...styles.iosDateBackdrop, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.25)'}}>
      <View style={pickerBg}>
        <View style={styles.pickerView}>
          <Picker
            placeholder={{}}
            style={pickerStyle}
            value={booking.table}
            onValueChange={table => setBooking({ ...booking, table })}
            items={
              total.filter(table => {
                const taken = [];
                bookings
                  .filter(thisBooking => thisBooking.period === booking.period)
                  .forEach(thisBooking => taken.push(thisBooking.table));

                return !taken.includes(table.value); // Only show available tables
              })
            }
            Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
          <TouchableOpacity onPress={() => setShow(null)}>
            <Text style={{color: colors.red, fontSize: 18, padding: 20}}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setStep(3); setShow(null); }}>
            <Text style={{color: colors.blue, fontSize: 18, padding: 20}}>Terminé</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
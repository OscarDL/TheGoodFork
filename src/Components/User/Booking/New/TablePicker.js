import React from 'react';
import { Icon } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import { View, Text, Platform, TouchableOpacity } from 'react-native';

import { styles } from '../../../../Reusables/Styles';


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

const tables = [
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 1', value: 1, key: 0 },
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 2', value: 2, key: 1 },
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 3', value: 3, key: 2 },
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 4', value: 4, key: 3 },
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 5', value: 5, key: 4 },
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 6', value: 6, key: 5 },
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 7', value: 7, key: 6 },
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 8', value: 8, key: 7 },
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 9', value: 9, key: 8 },
  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Table 10', value: 10, key: 9 },
];


export default function TablePicker({setStep, setShow, booking, bookings, setBooking}) {
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
              tables.filter(table => {
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
            <Text style={{color: '#f22', fontSize: 18, padding: 20}}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setStep(3);
            setShow(null);
          }}>
            <Text style={{color: '#28f', fontSize: 18, padding: 20}}>Terminé</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

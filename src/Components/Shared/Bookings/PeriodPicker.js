import React from 'react';
import { Icon } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import { View, Platform, TouchableOpacity } from 'react-native';

import Text from '../Text';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';


const pickerStyle = {
  inputIOS: styles.pickerInput,
  inputAndroid: styles.pickerInput,
  iconContainer: styles.pickerIconContainer
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


export default function PeriodPicker({tables, setStep, setShow, booking, bookings, setBooking}) {
  return (
    <View style={{...styles.iosDateBackdrop, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.25)'}}>
      <View style={pickerBg}>
        <View style={styles.pickerView}>
          <Picker
            items={[
              { label: 'Matin', value: 1, key: 0 },
              { label: 'Midi', value: 2, key: 1 },
              { label: 'Après-Midi', value: 3, key: 2 },
              { label: 'Soir', value: 4, key: 3 }
            ]}
            placeholder={{}}
            style={pickerStyle}
            value={booking.period}
            useNativeAndroidPickerStyle={false}
            onValueChange={period => setBooking({ ...booking, period })}
            Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
          <TouchableOpacity style={{width: '50%'}} onPress={() => setShow(0)}>
            <Text style={{padding: 24, color: colors.red, fontSize: 18, textAlign: 'center'}}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '50%'}} onPress={() => {
            setShow(0);
            setStep(2);

            const total = Array.from(Array(tables), (_, i) => i + 1);
            bookings
              .filter(thisBooking => thisBooking.period === booking.period)
              .forEach(thisBooking => total.splice(total.indexOf(thisBooking.table), 1));
              
            // Select lowest available table by default to avoid submit error
            setBooking({ ...booking, table: Math.min(...total) });
          }}>
            <Text style={{padding: 24, color: colors.blue, fontSize: 18, fontWeight: '500', textAlign: 'center'}}>Terminé</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
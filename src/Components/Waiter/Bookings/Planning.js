import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';

import Text from '../../Shared/Text';
import { styles } from '../../../Shared/styles';


LocaleConfig.locales['fr'] = {
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
};

LocaleConfig.defaultLocale = 'fr';


export default function WaiterPlanning({navigation}) {
  return (
    <View style={styles.container}>
      <CalendarList
        dayComponent={({date}) => {
          const day = new Date(date.timestamp).setHours(0,0,0,0);
          const now = new Date(Date.now()).setHours(0,0,0,0);

          return (
            <TouchableOpacity
              style={{minHeight: 34, padding: 10, justifyContent: 'center', alignItems: 'center', position: 'relative'}}
              onPress={() => {
                if (day < now) return null;
                return navigation.navigate('WaiterBookings', {date});
              }}
            >
              <Text style={{
                textAlign: 'center',
                color: day < now ? '#aaa' : (day === now ? 'deepskyblue' : 'black')
              }}>
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
        
        firstDay={1}
        pastScrollRange={1}
        futureScrollRange={12}

        scrollEnabled={true}
        showScrollIndicator={true}
      />
    </View>
  );
}
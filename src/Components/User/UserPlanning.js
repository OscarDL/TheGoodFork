import React from 'react';
import { View,  Text } from 'react-native';
import { Calendar,  CalendarList,  Agenda, LocaleConfig } from 'react-native-calendars';


import { styles } from '../../Reusables/Styles';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';


export default function UserPlanning({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title}} name='UserPlanningComponent' component={UserPlanningComponent} />
    </Stack.Navigator>
  );
}

function UserPlanningComponent({navigation,  route}) {
  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <Text>Calendar</Text>
    </View>
  );
}
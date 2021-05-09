import React from 'react';
import { View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import UserBooking from './UserBooking';
import UserNewBooking from './UserNewBooking';
import { styles } from '../../../Reusables/Styles';


const Stack = createStackNavigator();
const iosH = CardStyleInterpolators.forHorizontalIOS;
const iosV = Platform.OS === 'ios' ? iosH : CardStyleInterpolators.forVerticalIOS;

export default function UserPlanning({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title}} name='UserPlanningComponent' component={UserPlanningComponent}/>
      <Stack.Screen options={{cardStyleInterpolator: iosH, title: 'Réservations'}} name='UserBooking' component={UserBooking}/>
      <Stack.Screen options={{cardStyleInterpolator: iosV, title: 'Nouvelle réservation'}} name='UserNewBooking' component={UserNewBooking}/>
    </Stack.Navigator>
  );
}

function UserPlanningComponent({navigation}) {
  return (
    <View style={styles.container}>
      <CalendarList
        pastScrollRange={1}
        futureScrollRange={12}
        scrollEnabled={true}
        showScrollIndicator={true}
        onDayPress={day => navigation.navigate('UserBooking', {day})}
      />
    </View>
  );
}
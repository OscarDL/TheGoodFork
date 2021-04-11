import React from 'react';
import { View, Text } from 'react-native';

import { styles } from '../../Reusables/Styles';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function UserPlanning({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title}} name='UserPlanningComponent' component={UserPlanningComponent} />
    </Stack.Navigator>
  );
}

function UserPlanningComponent({navigation, route}) {
  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <View>
        <Text>Here will be the reservation calendar for customers to take reservations</Text>
        <Text>{route.name}</Text>
      </View>
    </View>
  );
}
import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { styles } from '../../Reusables/Styles';

const Stack = createStackNavigator();


export default function UserDishes({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title}} name='UserDishesComponent' component={UserDishesComponent} />
    </Stack.Navigator>
  );
}

function UserDishesComponent({navigation}) {
  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <Text>Full dishes menu will be shown here</Text>
    </View>
  );
}
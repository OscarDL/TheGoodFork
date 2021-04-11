import React from 'react';
import { View, Text } from 'react-native';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function UserHome({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title}} name='UserHomeComponent' component={UserHomeComponent} />
    </Stack.Navigator>
  );
}

function UserHomeComponent({navigation, route}) {
  const [{user}, _] = useDataLayerValue();
  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <Text style={styles.roboto}>Welcome, {user?.type} {user?.firstName}!</Text>
      <Text>{route.name}</Text>
    </View>
  );
}
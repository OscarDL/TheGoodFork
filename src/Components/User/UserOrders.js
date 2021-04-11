import React from 'react';
import { View, Text } from 'react-native';

import { styles } from '../../Reusables/Styles';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function UserOrders({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title}} name='UserOrdersComponent' component={UserOrdersComponent} />
    </Stack.Navigator>
  );
}

function UserOrdersComponent({navigation, route}) {
  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <View>
        <Text>{route.name}</Text>
      </View>
    </View>
  );
}
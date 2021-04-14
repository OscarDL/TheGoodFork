import React from 'react';
import { FAB } from 'react-native-paper';
import { View, Text } from 'react-native';

import UserNewOrder from './UserNewOrder';
import { styles } from '../../../Reusables/Styles';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function UserOrders({title}) {
  return (
    <Stack.Navigator initialRouteName='UserOrdersComponent'>
      <Stack.Screen options={{title}} name='UserOrdersComponent' component={UserOrdersComponent} />
      <Stack.Screen options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} name='UserNewOrder'>
        {props => <UserNewOrder {...props} title={title}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function UserOrdersComponent({navigation, route}) {
  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <View>
        <Text>{route.name}</Text>
      </View>
      <FAB style={styles.fab} animated label='New order' icon='plus' color='white' onPress={() => navigation.navigate('UserNewOrder')}/>
    </View>
  );
}
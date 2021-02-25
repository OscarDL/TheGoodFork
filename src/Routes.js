import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './User/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';

export default function Routes() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{headerShown: false}} name='Login' component={Login} />
        <Stack.Screen options={{headerShown: false}} name='Register' component={Register} />
        <Stack.Screen options={{headerLeft: null, animationEnabled: false}} name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
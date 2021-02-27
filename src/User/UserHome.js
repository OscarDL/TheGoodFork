import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../Styles';
import { useDataLayerValue } from '../Context/DataLayer';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function UserHome({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title, headerLeft: null}} name='UserHomeComponent' component={UserHomeComponent} />
    </Stack.Navigator>
  );
}

function UserHomeComponent({navigation}) {

  const [{user}, dispatch] = useDataLayerValue();

  const logout = async () => {
    await AsyncStorage.setItem('authToken', '');
    dispatch({type: 'SET_USER', user: null});
    dispatch({type: 'SET_TOKEN', token: ''});
  }

  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <Text style={{fontFamily: 'Roboto'}}>Welcome, {user?.type} {user?.firstName}!</Text>
      <Button title='Log out' buttonStyle={[styles.button]} onPress={logout} />
    </View>
  );
}
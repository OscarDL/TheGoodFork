import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../Styles';
import { useDataLayerValue } from '../Context/DataLayer';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const logout = async (dispatch) => {
  await AsyncStorage.setItem('authToken', '');
  dispatch({type: 'SET_USER', user: null});
  dispatch({type: 'SET_TOKEN', token: ''});
}


export default function UserHome({title}) {
  const [_, dispatch] = useDataLayerValue();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title, headerLeft: null, headerRight: () => (<Button title='Log out' onPress={() => logout(dispatch)} buttonStyle={{...styles.button, marginRight: 10}} />)}} name='UserHomeComponent' component={UserHomeComponent} />
    </Stack.Navigator>
  );
}

function UserHomeComponent({navigation}) {
  const [{user}, dispatch] = useDataLayerValue();
  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <Text style={styles.roboto}>Welcome, {user?.type} {user?.firstName}!</Text>
      <Button title='Log out' buttonStyle={[styles.button]} onPress={() => logout(dispatch)} />
    </View>
  );
}
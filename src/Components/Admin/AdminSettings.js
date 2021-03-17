import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';

const logout = async (dispatch) => {
  await AsyncStorage.setItem('authToken', '');
  dispatch({type: 'SET_USER', user: null});
  dispatch({type: 'SET_TOKEN', token: ''});
}

export default function AdminSettings() {
  const [_, dispatch] = useDataLayerValue();
  return (
    <View style={[styles.container]}>
      <Text>SETTINGS</Text>
      <Button title='Log out' buttonStyle={[styles.button]} onPress={() => logout(dispatch)} />
    </View>
  );
}
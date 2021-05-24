import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../../Shared/styles';
import { useDataLayerValue } from '../Context/DataLayer';


export default function AdminSettings() {
  const [{}, dispatch] = useDataLayerValue();

  const logout = async () => {
    await AsyncStorage.setItem('authToken', '');
    dispatch({type: 'SET_USER', user: null});
    dispatch({type: 'SET_TOKEN', token: ''});
  };


  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <Text>SETTINGS</Text>
      <Button title='Log out' buttonStyle={[styles.button]} onPress={logout} />
    </View>
  );
}
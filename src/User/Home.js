import React, { useEffect } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../Styles';


export default function Home({navigation}) {

  const logout = async () => {
    await AsyncStorage.setItem('authToken', '');
    checkLogin();
  }

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('authToken');
    !token && navigation.navigate('Login');
  };

  useEffect(() => {
    checkLogin();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => BackHandler.exitApp()
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <Text>Home page!</Text>
      <Button title='Log out' buttonStyle={[styles.button]} onPress={() => logout()} />
    </View>
  );
}
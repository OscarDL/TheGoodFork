import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { styles } from '../Styles';
import { useDataLayerValue } from '../Context/DataLayer';


export default function Login({navigation}) {

  const [{}, dispatch] = useDataLayerValue();

  const [loginPage, showLoginPage] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });


  const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('authToken');
    token ? DispatchUserInfo(token) : showLoginPage(true);
  };

  useEffect(() => { isLoggedIn(); }, []);

  
  const DispatchUserInfo = async (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const {data} = await axios.get('https://the-good-fork.herokuapp.com/api/auth/userinfo', config);
      
      if (data?.user) {
        dispatch({ type: 'SET_USER', user: data.user });
        navigation.navigate(data.user.type === 'admin' ? 'Admin' : 'Home');
        showLoginPage(true);
      }

    } catch (error) {
      Alert.alert(
        "Couldn't get user info",
        error.response.data.error,
        [{ text: 'DISMISS' }]
      );
    }
  }


  const loginUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const {data} = await axios.post('https://the-good-fork.herokuapp.com/api/auth/login', user, config);

      if (data?.token) {
        await AsyncStorage.setItem('authToken', data.token);
        dispatch({ type: 'SET_TOKEN', token: data.token });
        DispatchUserInfo(data.token);
      }

    } catch (error) {
      Alert.alert(
        "Couldn't sign you in",
        error.response.data.error,
        [{ text: 'RETRY' }]
      );
    }
  }

  return (
    loginPage &&
    <View style={styles.container}>
      <View style={{width: '100%'}}><Text style={{textAlign: 'center'}}>LOGO THE GOOD FORK</Text></View>

      <View>
        <View>
          <Input placeholder='Email address' onChangeText={email => setUserLogin({ ...userLogin, email })} />
          <Input placeholder='Password' secureTextEntry onChangeText={password => setUserLogin({ ...userLogin, password })} />
        </View>

        <View style={{alignItems: 'center'}}>
          <Button
            buttonStyle={[styles.button]}
            title='Login'
            icon={<Icon
              size={28}
              color='white'
              type='material'
              name='account-circle'
              style={{marginRight: 10}}
            />}
            onPress={() => loginUser(userLogin)}
          />
        </View>
      </View>
        
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('Register')}>
        <Text>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
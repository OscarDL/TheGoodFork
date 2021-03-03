import axios from 'axios';
import React, { useState } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../Styles';
import { useDataLayerValue } from '../Context/DataLayer';


export default function Login({navigation}) {

  const [_, dispatch] = useDataLayerValue();

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });

  
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
        dispatch({ type: 'SET_TOKEN', token });
        dispatch({ type: 'SET_USER', user: data.user });
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
    <View style={styles.container}>
      <View style={{width: '100%'}}><Text style={{...styles.roboto, textAlign: 'center'}}>LOGO THE GOOD FORK</Text></View>

      <View>
        <Input style={styles.roboto} placeholder='Email address' onChangeText={email => setUserLogin({ ...userLogin, email })} />
        <Input style={{...styles.roboto, marginBottom: 0}} placeholder='Password' secureTextEntry onChangeText={password => setUserLogin({ ...userLogin, password })} />

        <TouchableOpacity style={{padding: 10, paddingTop: 0}} onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.roboto}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center', marginVertical: 10}}>
        <Button
          buttonStyle={[styles.button]}
          title='Login'
          icon={<Icon
            size={28}
            color='white'
            type='material'
            name='lock-open'
            style={{marginRight: 10}}
          />}
          onPress={() => loginUser(userLogin)}
        />
      </View>
        
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.roboto}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
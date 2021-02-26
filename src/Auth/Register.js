import axios from 'axios';
import React, { useState } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { styles } from '../Styles';
import { useDataLayerValue } from '../Context/DataLayer';


export default function Register({navigation}) {

  const [userRegister, setUserRegister] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: 'user'
  });

  const [_, dispatch] = useDataLayerValue();

  const registerUser = async (user) => {
    let complete = true;
    for (const [_, value] of Object.entries(user)) {
      value === '' && (complete = false);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (!complete) {
      Alert.alert(
        "Incomplete registration",
        "Please fill in all the fields.",
        [{ text: 'DISMISS' }]
      );
      return;
    }
    
    if (user?.password !== user?.passCheck) {
      Alert.alert(
        "Couldn't register you",
        "Passwords do not match.",
        [{ text: 'RETRY' }]
      );
      return;
    }

    try {
      const {data} = await axios.post('https://the-good-fork.herokuapp.com/api/auth/register', user, config);

      if (data?.token) {
        await AsyncStorage.setItem('authToken', data.token);
        dispatch({ type: 'SET_TOKEN', token: data.token });
        dispatch({ type: 'SET_USER', user });

        Alert.alert(
          "Registration successful",
          "Welcome to The Good Fork!",
          [{
            text: 'LET ME IN',
            onPress: () => navigation.navigate('User')
          }]
        );
        
      } else {
        Alert.alert(
          "Couldn't register you",
          data?.error,
          [{ text: 'RETRY' }]
        );
      }
      
    } catch (error) {
      Alert.alert(
        "Couldn't register you",
        error.response.data.error,
        [{ text: 'RETRY' }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{width: '100%', textAlign: 'center'}}>
        I am {`(${userRegister?.firstName || 'a'} ${userRegister?.lastName || 'user'})`} with {userRegister?.password ? 'a' : 'no'} password set
      </Text>
      
      <View>
        <Input placeholder='Email address' onChangeText={email => setUserRegister({ ...userRegister, email })} />
        <Input placeholder='First name' onChangeText={firstName => setUserRegister({ ...userRegister, firstName })} />
        <Input placeholder='Last name' onChangeText={lastName => setUserRegister({ ...userRegister, lastName })} />
        <Input placeholder='Password' secureTextEntry onChangeText={password => setUserRegister({ ...userRegister, password })} />
        <Input placeholder='Confirm password' secureTextEntry onChangeText={passCheck => setUserRegister({ ...userRegister, passCheck })} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Register'
          icon={<Icon
            size={28}
            color='white'
            type='material'
            name='account-circle'
            style={{marginRight: 10}}
          />}
          onPress={() => registerUser(userRegister)}
        />
      </View>

      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('Login')}><Text>Already have an account? Sign in</Text></TouchableOpacity>
    </View>
  );
}
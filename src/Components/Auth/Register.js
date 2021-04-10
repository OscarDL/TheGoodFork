import React, { useState } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';
import { registerUser } from '../../Functions/auth';


const handleRegister = (user, dispatch) => {
  registerUser(user).then(res => Alert.alert(
    res.success ? "Registration successful" : "Could not validate order",
    res.success ? "Welcome to The Good Fork!" : res,
    [{
      text: res.success ? 'LET ME IN' : 'RETRY',
      onPress: async () => { if (res.success) {
        await AsyncStorage.setItem('authToken', res.token);
        dispatch({ type: 'SET_TOKEN', token: res.token });
        dispatch({ type: 'SET_USER', user: res.user }); // Routes stack will change once user context changes
      }}
    }]
  ));
}


export default function Register({navigation}) {
  const [_, dispatch] = useDataLayerValue();
  const [userRegister, setUserRegister] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: 'user'
  });


  return (
    <View style={styles.container}>
      <Text style={{...styles.roboto, textAlign: 'center'}}>
        I am {`(${userRegister?.firstName || 'a'} ${userRegister?.lastName || 'user'})`} with {userRegister?.password ? 'a' : 'no'} password set
      </Text>
      
      <View>
        <Input style={styles.roboto} placeholder='First name' onChangeText={firstName => setUserRegister({ ...userRegister, firstName })} />
        <Input style={styles.roboto} placeholder='Last name' onChangeText={lastName => setUserRegister({ ...userRegister, lastName })} />
        <Input style={styles.roboto} placeholder='Email address' autoCapitalize='none' onChangeText={email => setUserRegister({ ...userRegister, email })} />
        <Input style={styles.roboto} placeholder='Password' secureTextEntry onChangeText={password => setUserRegister({ ...userRegister, password })} />
        <Input style={styles.roboto} placeholder='Confirm password' secureTextEntry onChangeText={passCheck => setUserRegister({ ...userRegister, passCheck })} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Register'
          icon={<Icon
            size={28}
            color='white'
            type='material'
            name='how-to-reg'
            style={{marginRight: 10}}
          />}
          onPress={() => handleRegister(userRegister, dispatch)}
        />
      </View>

      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.roboto}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
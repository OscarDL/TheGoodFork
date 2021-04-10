import React, { useState } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';
import { dispatchUserInfo, login } from '../../Functions/auth';


const loginUser = (user, dispatch) => {
  login(user).then(async (res) => {
    if (!res.success)
      return Alert.alert("User login", res, [{text: "RETRY"}]);

    dispatch({ type: 'SET_USER', user: res.user });
    dispatch({ type: 'SET_TOKEN', token: res.token });
    await AsyncStorage.setItem('authToken', res.token);
  });
}


export default function Login({navigation}) {
  const [,dispatch] = useDataLayerValue();
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });


  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}><Text style={{...styles.roboto, textAlign: 'center'}}>LOGO THE GOOD FORK</Text></View>

      <View>
        <Input style={styles.roboto} autoCapitalize='none' placeholder='Email address' onChangeText={email => setUserLogin({ ...userLogin, email })} />
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
          onPress={() => loginUser(userLogin, dispatch)}
        />
      </View>
        
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.roboto}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
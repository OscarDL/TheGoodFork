import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';

import { styles } from '../../Shared/styles';
import { registerUser } from '../../Functions/auth';
import { useDataLayerValue } from '../Context/DataLayer';


const handleRegister = (user, dispatch) => {
  registerUser(user).then(async (res) => {
    if (!res.success) return (
      Toast.show({
        text1: "Erreur d'inscription",
        text2: res,
        
        type: 'error',
        position: 'bottom',
        visibilityTime: 1500
      })
    );

    dispatch({ type: 'SET_USER', user: res.user });
    dispatch({ type: 'SET_TOKEN', token: res.token });
    await AsyncStorage.setItem('authToken', res.token);
  });
}


export default function Register({navigation}) {
  const [{}, dispatch] = useDataLayerValue();
  const [userRegister, setUserRegister] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: 'user'
  });


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <Text style={{textAlign: 'center'}}>Sécurité du mot de passe :
        <Text style={{color: userRegister.password.length < 8 ? '#f22' : (userRegister.password.length < 12 ? 'orange' : 'limegreen')}}>
          {userRegister.password.length < 8 ? ' FAIBLE' : (userRegister.password.length < 12 ? ' MOYENNE' : ' HAUTE')}
        </Text>
      </Text>
      
      <View>
        <Input placeholder='First name' onChangeText={firstName => setUserRegister({ ...userRegister, firstName })} />
        <Input placeholder='Last name' onChangeText={lastName => setUserRegister({ ...userRegister, lastName })} />
        <Input placeholder='Email address' keyboardType='email-address' autoCapitalize='none' onChangeText={email => setUserRegister({ ...userRegister, email })} />
        <Input placeholder='Password' autoCapitalize='none' secureTextEntry onChangeText={password => setUserRegister({ ...userRegister, password })} />
        <Input placeholder='Confirm password' autoCapitalize='none' secureTextEntry onChangeText={passCheck => setUserRegister({ ...userRegister, passCheck })} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title="S'enregistrer"
          icon={<Icon
            size={28}
            color='white'
            name='how-to-reg'
            style={{marginRight: 10}}
          />}
          onPress={() => handleRegister(userRegister, dispatch)}
        />
      </View>
      <View></View>
    </KeyboardAvoidingView>
  );
}
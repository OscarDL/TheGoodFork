import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';

import { login } from '../../Functions/auth';
import { styles } from '../../Shared/styles';
import { useDataLayerValue } from '../Context/DataLayer';


const loginUser = (user, dispatch) => {
  login(user).then(async (res) => {
    if (!res.success) return (
      Toast.show({
        text1: 'Erreur de connexion',
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


export default function Login({navigation}) {
  const [{}, dispatch] = useDataLayerValue();
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={{width: '100%'}}>
        <Image
          style={{ width: 180, height: 180, alignSelf: 'center' }}
          source={{ uri: 'https://res.cloudinary.com/thegoodfork/image/upload/v1620079806/TGF_jrfhd0.png' }}
        />
      </View>

      <View>
        <Input autoCapitalize='none' keyboardType='email-address' placeholder='Email address' onChangeText={email => setUserLogin({ ...userLogin, email })} />
        <Input autoCapitalize='none' placeholder='Password' secureTextEntry onChangeText={password => setUserLogin({ ...userLogin, password })} />

        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('Forgot')}>
          <Text style={{padding: 10, paddingTop: 0, color: '#805A48'}}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          title='Connexion'
          icon={<Icon
            size={28}
            color='white'
            name='lock-open'
            style={{marginRight: 10}}
            />}
          onPress={() => loginUser(userLogin, dispatch)}
          buttonStyle={[styles.button]}
        />
      </View>
      
      <View></View>
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Je n'ai pas encore de compte</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
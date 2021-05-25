import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';

import { styles } from '../../Shared/styles';
import { register } from '../../Functions/user';
import { useDataLayerValue } from '../Context/DataLayer';


export default function Register() {
  const [{}, dispatch] = useDataLayerValue();
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: 'user'
  });


  const handleRegister = () => {
    register(user).then(async (res) => {
      if (!res.success) return (
        Toast.show({
          text1: "Erreur d'inscription",
          text2: res,
          
          type: 'error',
          position: 'bottom',
          visibilityTime: 1500
        })
      );
  
      await AsyncStorage.setItem('authToken', res.token);
      dispatch({ type: 'LOGIN', user: res.user, token: res.token });
    });
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <Text style={{textAlign: 'center'}}>Sécurité du mot de passe :
        <Text style={{color: user.password.length < 8 ? '#f22' : (user.password.length < 12 ? 'orange' : 'limegreen')}}>
          {user.password.length < 8 ? ' FAIBLE' : (user.password.length < 12 ? ' MOYENNE' : ' HAUTE')}
        </Text>
      </Text>
      
      <View>
        <Input placeholder='Prénom' onChangeText={firstName => setUser({...user, firstName})}/>
        <Input placeholder='Nom' onChangeText={lastName => setUser({...user, lastName})}/>
        <Input placeholder='Adresse email' keyboardType='email-address' autoCapitalize='none' onChangeText={email => setUser({...user, email})}/>
        <Input placeholder='Mot de passe' autoCapitalize='none' secureTextEntry onChangeText={password => setUser({...user, password})}/>
        <Input placeholder='Confirmation' autoCapitalize='none' secureTextEntry onChangeText={passCheck => setUser({...user, passCheck})}/>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          icon={<Icon
            color='white'
            name='how-to-reg'
            style={{marginRight: 10}}
          />}
          title="S'enregistrer"
          onPress={handleRegister}
          buttonStyle={[styles.button]}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
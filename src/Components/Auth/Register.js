import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { setItemAsync } from 'expo-secure-store';
import { Button, Input, Icon } from 'react-native-elements';
import { TouchableWithoutFeedback, Keyboard, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

import { colors } from '../../Shared/colors';
import { styles } from '../../Shared/styles';
import { register } from '../../Functions/user';
import { useAuthContext } from '../../Context/Auth/Provider';


export default function Register() {
  const [{}, authDispatch] = useAuthContext();
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: 'user'
  });


  const handleRegister = async () => {
    const res = await register(user);

    if (!res.success) return (
      Toast.show({
        text1: "Erreur d'inscription",
        text2: res,
        
        type: 'error',
        position: 'bottom',
        visibilityTime: 1500
      })
    );
  
    await setItemAsync('authToken', res.token);
    authDispatch({ type: 'LOGIN', user: res.user });
  };


  return (
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' ? Keyboard.dismiss() : null} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Text style={{textAlign: 'center', paddingHorizontal: 20}}>Sécurité du mot de passe :
          <Text style={{color: user.password.length < 8 ? colors.red : (user.password.length < 12 ? 'orange' : 'limegreen')}}>
            {user.password.length < 8 ? ' FAIBLE' : (user.password.length < 12 ? ' MOYENNE' : ' HAUTE')}
          </Text>
        </Text>
        
        <View>
          <View style={{flexDirection: 'row'}}>
            <Input
              placeholder='Prénom'
              containerStyle={{width: '50%'}}
              onChangeText={firstName => setUser({...user, firstName})}
            />
            <Input
              placeholder='Nom'
              containerStyle={{width: '50%'}}
              onChangeText={lastName => setUser({...user, lastName})}
            />
          </View>

          <Input
            autoCapitalize='none'
            placeholder='Adresse email'
            keyboardType='email-address'
            onChangeText={email => setUser({...user, email})}
          />
          
          <View style={{flexDirection: 'row'}}>
            <Input
              secureTextEntry
              autoCapitalize='none'
              placeholder='Mot de passe'
              containerStyle={{width: '50%'}}
              onChangeText={password => setUser({...user, password})}
            />
            <Input
              secureTextEntry
              autoCapitalize='none'
              placeholder='Confirmation'
              containerStyle={{width: '50%'}}
              onChangeText={passCheck => setUser({...user, passCheck})}
            />
          </View>
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
    </TouchableWithoutFeedback>
  );
}
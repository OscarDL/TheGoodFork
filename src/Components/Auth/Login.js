import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { setItemAsync } from 'expo-secure-store';
import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedback, Keyboard, View, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';

import Text from '../Shared/Text';
import { login } from '../../Functions/user';
import { colors } from '../../Shared/colors';
import { styles } from '../../Shared/styles';
import { useAuthContext } from '../../Context/Auth/Provider';


export default function Login({navigation}) {
  const [{}, authDispatch] = useAuthContext();
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });

  
  const loginUser = async () => {
    const res = await login(userLogin);

    if (!res.success) return (
      Toast.show({
        text1: 'Erreur de connexion',
        text2: res,
        
        type: 'error',
        position: 'bottom',
        visibilityTime: 1500
      })
    );
  
    await setItemAsync('authToken', res.token);
    await AsyncStorage.setItem('signedIn', 'true');
    authDispatch({ type: 'LOGIN', user: res.user });
  };


  return (
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' ? Keyboard.dismiss() : null} accessible={false}>
      <KeyboardAvoidingView
        style={{...styles.container, alignItems: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Image
          style={{width: 180, height: 180}}
          source={{ uri: 'https://res.cloudinary.com/thegoodfork/image/upload/v1620079806/TGF_brown.png' }}
        />

        <View style={{alignSelf: 'stretch'}}>
          <Input autoCapitalize='none' placeholder='Adresse email' keyboardType='email-address' onChangeText={email => setUserLogin({...userLogin, email})}/>
          <Input autoCapitalize='none' placeholder='Mot de passe' secureTextEntry onChangeText={password => setUserLogin({...userLogin, password})}/>

          <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('Forgot')}>
            <Text style={{padding: 10, paddingTop: 0, color: colors.accentPrimary}}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Button
            icon={<Icon
              color='white'
              name='lock-open'
              style={{marginRight: 10}}
            />}
            title='Connexion'
            onPress={loginUser}
            buttonStyle={[styles.button]}
          />
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{...styles.link, padding: 20}}>Je n'ai pas encore de compte</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
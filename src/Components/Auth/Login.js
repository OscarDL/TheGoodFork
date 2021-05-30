import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { setItemAsync } from 'expo-secure-store';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';

import { login } from '../../Functions/user';
import { colors } from '../../Shared/colors';
import { styles } from '../../Shared/styles';
import { useDataLayerValue } from '../Context/DataLayer';


export default function Login({navigation}) {
  const [{}, dispatch] = useDataLayerValue();
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
    dispatch({ type: 'LOGIN', user: res.user, token: res.token });
  };


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
        <Input autoCapitalize='none' placeholder='Adresse email' keyboardType='email-address' onChangeText={email => setUserLogin({...userLogin, email})}/>
        <Input autoCapitalize='none' placeholder='Mot de passe' secureTextEntry onChangeText={password => setUserLogin({...userLogin, password})}/>

        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('Forgot')}>
          <Text style={{padding: 10, paddingTop: 0, color: colors.accentPrimary}}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
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
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Je n'ai pas encore de compte</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
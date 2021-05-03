/*import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';

import { login } from '../../Functions/auth';
import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';


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
  const [_, dispatch] = useDataLayerValue();
  const [userLogin, setUserLogin] = useState({email: '', password: ''});

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: '#2C968F'}}>
      <StatusBar style='light'/>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: '#2C968F'}}>
        <Text style={{...styles.title, color: 'white', marginVertical: 10}}>Connexion</Text>
        <Text style={{...styles.title, color: 'white', marginVertical: 10}}>[LOGO]</Text>
      </View>
      
      <View style={{flex: 5, backgroundColor: '#e2e2e2', borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
        <View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#2C968F', paddingBottom: 5}}>
            <Icon name='how-to-reg' color='#2C968F' style={{paddingHorizontal: 6}}/>
            <TextInput
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='Addresse email'
              style={{paddingHorizontal: 6, borderRadius: 6}}
              onChangeText={email => setUserLogin({ ...userLogin, email })}
            />
          </View>
          
          <View style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#2C968F', paddingBottom: 5}}>
            <Icon name='lock' color='#2C968F' style={{paddingHorizontal: 6}}/>
            <TextInput
              secureTextEntry
              autoCapitalize='none'
              placeholder='Mot de passe'
              style={{paddingHorizontal: 6, borderRadius: 6}}
              onChangeText={password => setUserLogin({ ...userLogin, password })}
            />
          </View>

          <TouchableOpacity style={{padding: 10}} onPress={() => navigation.navigate('Forgot')}>
            <Text style={{textAlign: 'right', color: '#2C968F', paddingVertical: 5}}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', marginVertical: 60}}>
          <Button
            title='  Connexion'
            icon={<Icon color='white' name='lock-open'/>}
            onPress={() => loginUser(userLogin, dispatch)}
            buttonStyle={[styles.button, {backgroundColor: '#2C968F'}]}
          />
        </View>
          
        <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('Register')}>
          <Text style={{color: '#28b', fontSize: 18, fontWeight: 'bold'}}>Je n'ai pas de compte</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}*/


import React, { useState } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';

import { login } from '../../Functions/auth';
import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';


const loginUser = (user, dispatch) => {
  login(user).then(async (res) => {
    if (!res.success)
      return Alert.alert('Erreur lors de la connexion', res, [{text: 'Réessayer'}]);

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
          buttonStyle={[{...styles.button, marginVertical: 20}]}
        />
      </View>
      <View></View>
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Je n'ai pas encore de compte</Text>
      </TouchableOpacity>
    </View>
  );
}
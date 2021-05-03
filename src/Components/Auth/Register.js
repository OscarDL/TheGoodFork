/*import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Alert, TextInput, Platform } from 'react-native';

import { styles } from '../../Reusables/Styles';
import { registerUser } from '../../Functions/auth';
import { useDataLayerValue } from '../Context/DataLayer';


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
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' backgroundColor='#2C968F'/>

      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: '#2C968F'}}>
        <View style={{position: 'absolute', top: 0, left: 10}}>
          {Platform.OS === 'ios'
            ?
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name='arrow-back-ios' color='white'/>
          </TouchableOpacity>
            :
          <Button
            onPress={navigation.goBack}
            buttonStyle={[{backgroundColor: '#2C968F'}]}
            icon={<Icon name={Platform.OS === 'ios' ? 'arrow-back-ios' : 'arrow-back'} color='white'/>}
          />}
        </View>

        <Text style={{...styles.title, color: 'white', marginVertical: 10}}>S'enregistrer</Text>
        <Text style={{...styles.title, color: 'white', marginVertical: 10}}>[LOGO]</Text>
      </View>
      
      <View style={{flex: 5, backgroundColor: '#e2e2e2', borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
        <View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 20}}>
            <View style={{borderBottomColor: '#2C968F', borderBottomWidth: 1, flexDirection: 'row', flexGrow: 1, width: '52%'}}>
              <Icon name='how-to-reg' color='#2C968F' style={{paddingHorizontal: 6}}/>
              <TextInput
                secureTextEntry
                autoCapitalize='none'
                placeholder='Prénom'
                style={{paddingHorizontal: 6, paddingBottom: 5}}
                onChangeText={firstName => setUserRegister({ ...userRegister, firstName })}
              />
            </View>
            <View style={{width: '4%'}}></View>
            <View style={{width: '44%'}}>
              <TextInput
                secureTextEntry
                autoCapitalize='none'
                placeholder='Nom'
                style={{paddingHorizontal: 6, borderBottomWidth: 1, borderBottomColor: '#2C968F', paddingBottom: 5, flexGrow: 1}}
                onChangeText={lastName => setUserRegister({ ...userRegister, lastName })}
              />
            </View>
          </View>

          <View style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#2C968F', paddingBottom: 5}}>
            <Icon name='send' color='#2C968F' style={{paddingHorizontal: 6}}/>
            <TextInput
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='Addresse email'
              style={{paddingHorizontal: 6, borderRadius: 6}}
              onChangeText={email => setUserRegister({ ...userRegister, email })}
            />
          </View>
          
          <View style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 20}}>
            <View style={{borderBottomColor: '#2C968F', borderBottomWidth: 1, flexDirection: 'row', flexGrow: 1, width: '52%'}}>
              <Icon name='lock' color='#2C968F' style={{paddingHorizontal: 6}}/>
              <TextInput
                secureTextEntry
                autoCapitalize='none'
                placeholder='Mot de passe'
                style={{paddingHorizontal: 6, paddingBottom: 5}}
                onChangeText={password => setUserRegister({ ...userRegister, password })}
              />
            </View>
            <View style={{width: '4%'}}></View>
            <View style={{width: '44%'}}>
              <TextInput
                secureTextEntry
                autoCapitalize='none'
                placeholder='Confirmation'
                style={{paddingHorizontal: 6, borderBottomWidth: 1, borderBottomColor: '#2C968F', paddingBottom: 5, flexGrow: 1}}
                onChangeText={passCheck => setUserRegister({ ...userRegister, passCheck })}
              />
            </View>
          </View>
        </View>

        <View style={{alignItems: 'center', marginTop: 80}}>
          <Button
            title="  S'enregistrer"
            icon={<Icon color='white' name='how-to-reg'/>}
            onPress={() => handleRegister(userRegister, dispatch)}
            buttonStyle={[styles.button, {backgroundColor: '#2C968F'}]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}*/


import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../../Reusables/Styles';
import { registerUser } from '../../Functions/auth';
import { useDataLayerValue } from '../Context/DataLayer';


const handleRegister = (user, dispatch) => {
  registerUser(user).then(res => Alert.alert(
    res.success ? 'Compte créé avec succès' : 'Erreur de création de compte',
    res.success ? 'Bienvenue à The Good Fork!' : res,
    [{
      text: res.success ? 'Entrer' : 'Réessayer',
      onPress: async () => { if (res.success) {
        await AsyncStorage.setItem('authToken', res.token);
        dispatch({ type: 'SET_TOKEN', token: res.token });
        dispatch({ type: 'SET_USER', user: res.user }); // Routes stack will change once user context changes
      } else null }
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
    </View>
  );
}
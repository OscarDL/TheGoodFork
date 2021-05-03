import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { resetPassword } from '../../Functions/auth';

import { styles } from '../../Reusables/Styles';


const handleReset = (token, password, passCheck, navigation) => {
  resetPassword(token, password, passCheck).then(res => Alert.alert(
    res.success ? res.title : "Password reset",
    res.success ? res.desc : res,
    [{
      text: res.success ? "DONE" : "RETRY",
      onPress: () => res.success ? navigation.navigate('Login') : null
    }]
  ))
}


export default function Reset({navigation}) {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState(null);
  const [passCheck, setPassCheck] = useState(null);


  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <View>
        <Text style={{margin: 10, textAlign: 'center'}}>Réinitialisation du mot de passe</Text>
        <Text style={{margin: 10, textAlign: 'center'}}>Veuillez entrer le code qui vous a été envoyé par email, ainsi que votre nouveau mot de passe.</Text>
      </View>
      <View style={{width: '100%'}}>
        <Input placeholder='Code secret' onChangeText={token => setToken(token)} />
        <Input placeholder='Nouveau mot de passe' secureTextEntry onChangeText={password => setPassword(password)} />
        <Input placeholder='Confirmation' secureTextEntry onChangeText={passCheck => setPassCheck(passCheck)} />
      </View>
      <Button buttonStyle={[styles.button]} title='Réinitialiser' onPress={() => handleReset(token, password, passCheck, navigation)} />
    </View>
  );
}
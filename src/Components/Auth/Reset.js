import axios from 'axios';
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
        <Text style={{...styles.roboto, margin: 10, textAlign: 'center'}}>Reset your password</Text>
        <Text style={{...styles.roboto, margin: 10, textAlign: 'center'}}>Please fill-in the reset code we sent you via email, as well as your new password, to reset your credentials.</Text>
      </View>
      <View style={{width: '100%'}}>
        <Input style={styles.roboto} placeholder='Reset code' onChangeText={token => setToken(token)} />
        <Input style={styles.roboto} placeholder='New password' secureTextEntry onChangeText={password => setPassword(password)} />
        <Input style={styles.roboto} placeholder='Confirm new password' secureTextEntry onChangeText={passCheck => setPassCheck(passCheck)} />
      </View>
      <Button buttonStyle={[styles.button]} title='Request password reset' onPress={() => handleReset(token, password, passCheck, navigation)} />
    </View>
  );
}
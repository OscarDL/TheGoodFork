import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { styles } from '../Styles';


export default function Reset({navigation}) {

  const [token, setToken] = useState(null);
  const [password, setPassword] = useState(null);
  const [passCheck, setPassCheck] = useState(null);

  const resetPassword = async (resetToken, password, passCheck) => {

    if (resetToken === null || resetToken === '') {
      Alert.alert(
        "Password reset",
        "Please fill-in your reset code.",
        [{ text: 'RETRY' }]
      );
      return;
    }

    if (!(password?.length > 0 && passCheck?.length > 0)) {
      Alert.alert(
        "Password reset",
        "Please enter and confirm your new password.",
        [{ text: 'RETRY' }]
      );
      return;
    }

    if (password !== passCheck) {
      Alert.alert(
        "Password reset",
        "Your new passwords do not match.",
        [{ text: 'RETRY' }]
      );
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const {data} = await axios.put('https://the-good-fork.herokuapp.com/api/auth/resetpassword/' + resetToken, {password}, config);

      if (data?.success) {
        Alert.alert(
          "Password reset",
          data.data,
          [{ text: 'OKAY', onPress: () => navigation.navigate('Login') }]
        );
      }

    } catch (error) {
      Alert.alert(
        "Couldn't reset password",
        error.response.data.error,
        [{ text: 'RETRY', onPress: () =>  navigation.goBack() }]
      );
    }
  }


  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <View>
        <Text style={{margin: 10, textAlign: 'center'}}>Reset your password</Text>
        <Text style={{margin: 10, textAlign: 'center'}}>Please fill-in the reset code we sent you via email, as well as your new password, to reset your credentials.</Text>
      </View>

      
        <Input placeholder='Reset code' onChangeText={token => setToken(token)} />
        <Input placeholder='New password' secureTextEntry onChangeText={password => setPassword(password)} />
        <Input placeholder='Confirm new password' secureTextEntry onChangeText={passCheck => setPassCheck(passCheck)} />
      

      <Button buttonStyle={[styles.button]} title='Request password reset' onPress={() => resetPassword(token, password, passCheck)} />
    </View>
  );
}
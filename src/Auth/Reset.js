import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { styles } from '../Styles';


export default function Reset({navigation}) {

  const [token, setToken] = useState(null);
  const [password, setPassword] = useState(null);
  const [passCheck, setPassCheck] = useState(null);

  const sendAlert = (message) => {
    Alert.alert(
      "Password reset",
      message,
      [{ text: 'RETRY' }]
    );
  }

  const resetPassword = async (resetToken, password, passCheck) => {

    if (!resetToken) {
      sendAlert("Please enter the reset code you received via email.");
      return;
    }

    if (!password || !passCheck) {
      sendAlert("Please type-in and confirm your new password.");
      return;
    }

    if (password !== passCheck) {
      sendAlert("Passwords do not match.");
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
        <Text style={{...styles.roboto, margin: 10, textAlign: 'center'}}>Reset your password</Text>
        <Text style={{...styles.roboto, margin: 10, textAlign: 'center'}}>Please fill-in the reset code we sent you via email, as well as your new password, to reset your credentials.</Text>
      </View>
      <View style={{width: '100%'}}>
        <Input style={styles.roboto} placeholder='Reset code' onChangeText={token => setToken(token)} />
        <Input style={styles.roboto} placeholder='New password' secureTextEntry onChangeText={password => setPassword(password)} />
        <Input style={styles.roboto} placeholder='Confirm new password' secureTextEntry onChangeText={passCheck => setPassCheck(passCheck)} />
      </View>
      <Button buttonStyle={[styles.button]} title='Request password reset' onPress={() => resetPassword(token, password, passCheck)} />
    </View>
  );
}
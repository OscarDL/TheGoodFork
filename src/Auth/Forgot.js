import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { styles } from '../Styles';

export default function Forgot({navigation}) {

  const [email, setEmail] = useState(null);

  const sendEmail = async (email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const {data} = await axios.post('https://the-good-fork.herokuapp.com/api/auth/forgotpassword', {email}, config);

      if (data?.success) {
        Alert.alert(
          "Password reset",
          data.data,
          [{ text: 'NEXT', onPress: () => navigation.navigate('Reset') }]
        );
      }

    } catch (error) {
      Alert.alert(
        "Couldn't send email",
        error.response.data.error,
        [{ text: 'RETRY' }]
      );
    }
  }


  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <View>
        <Text style={{margin: 10, textAlign: 'center'}}>Forgot your password?</Text>
        <Text style={{margin: 10, textAlign: 'center'}}>Please fill-in your email address in order to reset it.</Text>
      </View>
      <Input placeholder='Email address' onChangeText={email => setEmail(email)} />
      <Button buttonStyle={[styles.button]} title='Request password reset' onPress={() => sendEmail(email)} />
    </View>
  );
}
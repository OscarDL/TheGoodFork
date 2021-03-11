import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

import { styles } from '../Styles';

export default function Forgot({navigation}) {

  const [email, setEmail] = useState(null);

  const sendEmail = async (email) => {

    if (!email) {
      Alert.alert(
        "Email address incorrect",
        "Please provide an email address to send the reset code to.",
        [{ text: 'OKAY' }]
      );
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      email = email.replace(' ', '');
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
        <Text style={{...styles.roboto, margin: 10, textAlign: 'center'}}>Forgot your password?</Text>
        <Text style={{...styles.roboto, margin: 10, textAlign: 'center'}}>Please fill-in your email address in order to reset it.</Text>
      </View>

      <Input style={styles.roboto} autoCapitalize='none' placeholder='Email address' onChangeText={email => setEmail(email)} />

      <Button
        buttonStyle={[styles.button]}
        title='Request password reset'
        onPress={() => sendEmail(email)}
        icon={<Icon size={24} color='white' type='font-awesome' name='paper-plane' style={{marginRight: 10, padding: 2}}/>}
      />
    </View>
  );
}
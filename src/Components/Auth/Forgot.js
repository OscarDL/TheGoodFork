import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

import { styles } from '../../Reusables/Styles';
import { sendEmail } from '../../Functions/auth';


const handleEmail = (email, navigation) => {
  sendEmail(email).then(res => Alert.alert(
    res.success ? res.title : "Could not send email",
    res.success ? res.desc : res,
    [{
      text: res.success ? "NEXT" : "RETRY",
      onPress: () => res.success ? navigation.navigate('Reset') : null
    }]
  ));
}


export default function Forgot({navigation}) {
  const [email, setEmail] = useState(null);

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
        onPress={() => handleEmail(email, navigation)}
        icon={<Icon size={24} color='white' type='font-awesome' name='paper-plane' style={{marginRight: 10, padding: 2}}/>}
      />
    </View>
  );
}
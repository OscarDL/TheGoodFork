import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableWithoutFeedback, Keyboard, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

import { styles } from '../../Shared/styles';
import { sendEmail } from '../../Functions/user';


export default function Forgot({navigation}) {
  const [email, setEmail] = useState(null);

  const handleEmail = () => {
    sendEmail(email).then(res => {
      Toast.show({
        text1: res.title ?? "Erreur d'envoi de l'email",
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      })
      res.success && navigation.navigate('Reset');
    });
  };


  return (
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' ? Keyboard.dismiss() : null} accessible={false}>
      <KeyboardAvoidingView
        style={{...styles.container, alignItems: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Text style={{margin: 10, textAlign: 'center'}}>Veuillez entrer votre adresse email pour réinitialiser votre mot de passe.</Text>
        <Input keyboardType='email-address' autoCapitalize='none' placeholder='Adresse email' onChangeText={email => setEmail(email)} />
        <View style={{marginVertical: 50}}>
          <Button
            icon={<Icon
              name='send'
              color='white'
              style={{marginRight: 10}}
            />}
            onPress={handleEmail}
            title='Envoyer ma demande'
            buttonStyle={[styles.button]} 
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
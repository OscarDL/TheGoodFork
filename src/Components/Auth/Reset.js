import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Input, Icon } from 'react-native-elements';
import { TouchableWithoutFeedback, Keyboard, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

import { styles } from '../../Shared/styles';
import { resetPassword } from '../../Functions/user';


export default function Reset({navigation}) {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState(null);
  const [passCheck, setPassCheck] = useState(null);

  const handleReset = () => {
    resetPassword(token, password, passCheck).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de réinitialisation',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && navigation.navigate('Login');
    });
  };


  return (
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' ? Keyboard.dismiss() : null} accessible={false}>
      <KeyboardAvoidingView
        style={{...styles.container, alignItems: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <View>
          <Text style={{margin: 10, textAlign: 'center'}}>Réinitialisation de votre mot de passe</Text>
          <Text style={{margin: 10, textAlign: 'center'}}>Veuillez entrer le code qui vous a été envoyé par email, ainsi que votre nouveau mot de passe.</Text>
        </View>
        <View style={{width: '100%'}}>
          <Input placeholder='Code secret' onChangeText={token => setToken(token)}/>
          <Input placeholder='Nouveau mot de passe' secureTextEntry onChangeText={password => setPassword(password)}/>
          <Input placeholder='Confirmation' secureTextEntry onChangeText={passCheck => setPassCheck(passCheck)}/>
        </View>
        <Button
          icon={<Icon
            name='done'
            color='white'
            style={{marginRight: 10}}
          />}
          title='Réinitialiser'
          onPress={handleReset}
          buttonStyle={[styles.button]}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
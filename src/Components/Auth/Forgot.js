import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

import { styles } from '../../Reusables/Styles';
import { sendEmail } from '../../Functions/auth';


const handleEmail = (email, navigation) => {
  sendEmail(email).then(res => Alert.alert(
    res.success ? res.title : "Erreur lors de l'envoi de l'email",
    res.success ? res.desc : res,
    [{
      text: res.success ? 'Suivant' : 'Réessayer',
      onPress: () => res.success ? navigation.navigate('Reset') : null
    }]
  ));
}


export default function Forgot({navigation}) {
  const [email, setEmail] = useState(null);

  return (
    <KeyboardAvoidingView
      style={{...styles.container, alignItems: 'center'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={{margin: 10, textAlign: 'center'}}>Veuillez entrer votre adresse email pour la réinitialisation.</Text>
      <Input autoCapitalize='none' placeholder='Adresse email' onChangeText={email => setEmail(email)} />
      <View style={{marginVertical: 50}}>
        <Button
          title='Envoyer ma demande'
          buttonStyle={[styles.button]} 
          onPress={() => handleEmail(email, navigation)}
          icon={<Icon size={24} color='white' name='send' style={{marginRight: 10, padding: 2}}/>}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
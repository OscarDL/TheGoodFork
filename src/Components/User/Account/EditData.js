import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { Icon, Input, Button } from 'react-native-elements';
import { TouchableWithoutFeedback, Keyboard, View, Text, Platform, ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { updateData } from '../../../Functions/user';
import { useAuthContext } from '../../../Context/Auth/Provider';


export default function UpdateInfo() {
  const [{user}, authDispatch] = useAuthContext();

  const [newUser, setNewUser] = useState(user);
  const [loading, setLoading] = useState(false);


  const handleUpdate = () => {
    setLoading(true);

    updateData(newUser).then(res => {
      setLoading(false);
      Toast.show({
        text1: res.title ?? 'Erreur de modification',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && authDispatch({type: 'LOGIN', user: res.user});
    });
  };


  return (
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' ? Keyboard.dismiss() : null} accessible={false}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Text style={{textAlign: 'center', paddingHorizontal: 20}}>
          Vos commandes et réservations seront automatiquement mises à jour.
        </Text>

        <View>
          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Prénom</Text>
          <Input placeholder='Prénom' defaultValue={newUser.firstName} onChangeText={firstName => setNewUser({...newUser, firstName})} />

          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Nom</Text>
          <Input placeholder='Nom' defaultValue={newUser.lastName} onChangeText={lastName => setNewUser({...newUser, lastName})} />
          
          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Adresse email</Text>
          <Input
            autoCapitalize='none'
            placeholder='Adresse email'
            keyboardType='email-address'
            defaultValue={newUser.email}
            onChangeText={email => setNewUser({...newUser, email})}
          />
        </View>

        <Button
          icon={<Icon
            name='save'
            color='white'
            style={{marginRight: 10}}
          />}
          title='Sauvegarder'
          onPress={handleUpdate}
          buttonStyle={[{...styles.button, alignSelf: 'center'}]}
        />

        {loading && <View style={{...styles.container, ...styles.iosDateBackdrop, justifyContent: 'center'}}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
        </View>}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

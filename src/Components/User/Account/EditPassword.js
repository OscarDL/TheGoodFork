import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon, Input, Button } from 'react-native-elements';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { updatePassword } from '../../../Functions/user';
import { useAuthContext } from '../../../Context/Auth/Provider';


export default function UpdateInfo({navigation}) {
  const [{token}] = useAuthContext();

  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passCheck, setPassCheck] = useState('');


  const handleUpdate = () => {
    updatePassword(current, password, passCheck, token).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de modification',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && navigation.goBack();
    });
  };


  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', paddingHorizontal: 20}}>Sécurité du mot de passe :
        <Text style={{color: password.length < 8 ? colors.red : (password.length < 12 ? 'orange' : 'limegreen')}}>
          {password.length < 8 ? ' FAIBLE' : (password.length < 12 ? ' MOYENNE' : ' HAUTE')}
        </Text>
      </Text>

      <View>
        <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Mot de passe actuel</Text>
        <Input secureTextEntry onChangeText={cur => setCurrent(cur)} />

        <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Nouveau mot de passe</Text>
        <Input secureTextEntry onChangeText={pw => setPassword(pw)} />

        <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Confirmation</Text>
        <Input secureTextEntry onChangeText={pc => setPassCheck(pc)} />
      </View>

      <Button
        icon={<Icon
          name='edit'
          color='white'
          style={{marginRight: 10}}
        />}
        title='Modifier'
        onPress={handleUpdate}
        buttonStyle={[{...styles.button, alignSelf: 'center'}]}
      />
    </View>
  )
}

import React from 'react';
import Toast from 'react-native-toast-message';
import { Alert, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { colors } from '../colors';
import { deleteUser, logout } from '../../Functions/user';
import { useDataLayerValue } from '../../Context/DataLayer';


export default function LogoutButton() {
  const [{user, token}, dispatch] = useDataLayerValue();

  const handleDelete = () => {
    if (user.type !== 'user') return null;

    const actions = [
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => deleteUser(token).then(res => {
          Toast.show({
            text1: res.title ?? 'Erreur de supression',
            text2: res.desc ?? res,
            
            position: 'bottom',
            visibilityTime: 1500,
            type: res.success ? 'success' : 'error'
          });
          res.success && logout(dispatch);
        })
      }, {
        text: 'Annuler',
        style: 'cancel'
      }
    ];

    Alert.alert(
      'Supression de compte',
      'Un appui long sur le bouton de déconnexion vous permet de supprimer ' +
      'votre compte de manière définitive. Êtes-vous sûr de vouloir continuer ?',
      Platform.OS === 'ios' ? actions : actions.reverse()
    );
  };


  return (
    <Button
      icon={<Icon name='logout' color={colors.accentPrimary} size={25}/>}
      type='clear' buttonStyle={{padding: 10}} delayLongPress={1000}
      onPress={() => logout(dispatch)} onLongPress={handleDelete}
    />
  );
}

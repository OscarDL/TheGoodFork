import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback, Keyboard, View, Alert, Platform, KeyboardAvoidingView } from 'react-native';

import Text from '../../Shared/Text';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { editStaff, deleteStaff } from '../../../Functions/staff';


const pickerStyle = {
  inputIOS: styles.pickerInput,
  inputAndroid: styles.pickerInput,
  iconContainer: styles.pickerIconContainer
};


export default function AdminEditStaff({route, navigation}) {
  const {staff} = route.params;
  const [newStaff, setNewStaff] = useState({...staff, password: null});


  const handleEdit = () => {
    editStaff(newStaff).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de supression',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && navigation.goBack();
    });
  };
  
  const handleDelete = () => {
    const actions = [
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => deleteStaff(staff).then(res => {
          Toast.show({
            text1: res.title ?? 'Erreur de supression',
            text2: res.desc ?? res,
            
            position: 'bottom',
            visibilityTime: 1500,
            type: res.success ? 'success' : 'error'
          });
          res.success && navigation.goBack();
        })
      }, {
        text: 'Annuler',
        style: 'cancel'
      }
    ];
  
    Alert.alert(
      'Êtes-vous sûr ?',
      `Vous êtes sur le point de supprimer ${staff.firstName} ${staff.lastName}.`,
      Platform.OS === 'ios' ? actions : actions.reverse()
    );
  };
  

  return (
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' ? Keyboard.dismiss() : null} accessible={false}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <View style={{alignItems: 'center'}}>
          <Text style={{marginBottom: 10}}>Sélectionnez un rôle</Text>
          
          <View style={styles.pickerView}>
            <Picker
              items={[
                { label: 'Administrateur', value: 'admin', key: 0 },
                { label: 'Barman', value: 'barman', key: 1 },
                { label: 'Cuisinier', value: 'cook', key: 2 },
                { label: 'Serveur', value: 'waiter', key: 3 }
              ]}
              placeholder={{}}
              style={pickerStyle}
              value={newStaff.type}
              useNativeAndroidPickerStyle={false}
              onValueChange={type => setNewStaff({...newStaff, type})}
              Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
            />
          </View>
        </View>

        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Nom</Text>
              <Input value={newStaff.firstName} onChangeText={firstName => setNewStaff({...newStaff, firstName})}/>
            </View>
            <View style={{width: '50%'}}>
              <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Nom</Text>
              <Input value={newStaff.lastName} onChangeText={lastName => setNewStaff({...newStaff, lastName})}/>
            </View>
          </View>
          
          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Adresse email</Text>
          <Input value={newStaff.email} keyboardType='email-address' autoCapitalize='none' onChangeText={email => setNewStaff({...newStaff, email})}/>
          
          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Changer le mot de passe</Text>
          <Input secureTextEntry type='password' onChangeText={password => setNewStaff({...newStaff, password})}/>
        </View>

        <View style={{alignItems: 'center'}}>
          <Button
            icon={<Icon
              name='save'
              color='white'
              style={{marginRight: 10}}
            />}
            title='Sauvegarder'
            onPress={handleEdit}
            buttonStyle={[{...styles.button, marginBottom: 30}]}
          />

          <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={handleDelete}>
            <Text style={styles.delete}>Supprimer {staff.firstName} {staff.lastName}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
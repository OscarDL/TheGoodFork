import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Alert, Platform, KeyboardAvoidingView } from 'react-native';

import { styles } from '../../../Shared/styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import { editStaff, deleteStaff } from '../../../Functions/staff';


const pickerStyle = {
  inputIOS: {
    height: '100%',
    marginLeft: 12,
    marginRight: 28
  },
  inputAndroid: {
    height: '100%',
    marginRight: 20
  },
  iconContainer: {
    padding: 6,
    height: '100%'
  }
};

const handleEdit = (id, staff, token, navigation) => {
  editStaff(id, staff, token).then(res => {
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

const handleDelete = (staff, token, navigation) => {
  Alert.alert(
    'Êtes-vous sûr ?',
    `Vous êtes sur le point de supprimer ${staff.firstName} ${staff.lastName}.`,
    [
      { text: 'Annuler' },
      { text: 'Continuer',
        onPress: () => deleteStaff(staff, token).then(res => {
          Toast.show({
            text1: res.title ?? 'Erreur de supression',
            text2: res.desc ?? res,
            
            position: 'bottom',
            visibilityTime: 1500,
            type: res.success ? 'success' : 'error'
          });
          res.success && navigation.goBack();
        })
      }
    ]
  );
};


export default function AdminEditStaff({route, navigation}) {
  const {staff} = route.params;

  const [{token}] = useDataLayerValue();
  const [newStaff, setNewStaff] = useState({
    firstName: staff.firstName,
    lastName: staff.lastName,
    email: staff.email,
    type: staff.type,
    password: null
  });


  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom: 10}}>Sélectionnez un rôle</Text>
        
        <View style={styles.pickerView}>
          <Picker
            onValueChange={type => setNewStaff({...newStaff, type})}
            items={[
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Administrateur', value: 'admin', key: 0 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Barman', value: 'barman', key: 1 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Cuisinier', value: 'cook', key: 2 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Serveur', value: 'waiter', key: 3 }
            ]}
            placeholder={{}}
            value={newStaff.type}
            style={pickerStyle}
            Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
          />
        </View>
      </View>

      <View>
        <Input value={newStaff.firstName} onChangeText={firstName => setNewStaff({ ...newStaff, firstName })} />
        <Input value={newStaff.lastName} onChangeText={lastName => setNewStaff({ ...newStaff, lastName })} />
        <Input value={newStaff.email} keyboardType='email-address' autoCapitalize='none' onChangeText={email => setNewStaff({ ...newStaff, email })} />
        <Input placeholder='Changer le mot de passe' secureTextEntry type='password' onChangeText={password => setNewStaff({ ...newStaff, password })} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Sauvegarder'
          icon={<Icon
            name='save'
            color='white'
            style={{marginRight: 10}}
          />}
          onPress={() => handleEdit(staff._id, newStaff, token, navigation)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => handleDelete(staff, token, navigation)}>
        <Text style={styles.delete}>Supprimer</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
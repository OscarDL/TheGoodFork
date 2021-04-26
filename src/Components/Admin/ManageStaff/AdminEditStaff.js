import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import { editStaff, deleteStaff } from '../../../Functions/staff';


const handleEdit = (id, staff, token, navigation) => {
  editStaff(id, staff, token).then(res => Alert.alert(
    res.success ? res.title : 'Erreur lors de la modification',
    res.success ? res.desc : res,
    [{
      text: res.success ? 'Terminé' : 'Réessayer',
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
}

const handleDelete = (staff, token, navigation) => {
  Alert.alert(
    'Êtes-vous sûr ?',
    `Vous êtes sur le point de supprimer ${staff.firstName} ${staff.lastName}.`,
    [
      { text: 'Annuler' },
      { text: 'Continuer',
        onPress: () => deleteStaff(staff, token).then(res => Alert.alert(
          res.success ? res.title : 'Erreur lors de la suppression',
          res.success ? res.desc : res,
          [{
            text: res.success ? 'Terminé' : 'Réessayer',
            onPress: () => res.success ? navigation.goBack() : null
          }]
        ))
      }
    ]
  );
}


export default function AdminEditStaff({route, navigation}) {
  const {params} = route.params;

  const [{token},] = useDataLayerValue();
  const [newStaff, setNewStaff] = useState({
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    type: params.type,
    password: null
  });


  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginVertical: 10}}>Choisissez un rôle</Text>
        <View style={{height: 10}}></View>

        <View style={styles.pickerView}>
          <Picker
            style={{height: 40}}
            prompt='Sélectionnez le rôle'
            selectedValue={newStaff.type}
            onValueChange={type => setNewStaff({...newStaff, type})}
          >
            <Picker.Item label='    Administrateur' value='admin'/>
            <Picker.Item label='    Barman' value='barman'/>
            <Picker.Item label='    Cuisinier' value='cook'/>
            <Picker.Item label='    Serveur' value='waiter'/>
          </Picker>
        </View>
      </View>

      <View>
        <Input value={newStaff.firstName} onChangeText={firstName => setNewStaff({ ...newStaff, firstName })} />
        <Input value={newStaff.lastName} onChangeText={lastName => setNewStaff({ ...newStaff, lastName })} />
        <Input value={newStaff.email} autoCapitalize='none' onChangeText={email => setNewStaff({ ...newStaff, email })} />
        <Input placeholder='Changer le mot de passe' secureTextEntry onChangeText={password => setNewStaff({ ...newStaff, password })} />
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
          onPress={() => handleEdit(params._id, newStaff, token, navigation)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => handleDelete(params, token, navigation)}>
        <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
}
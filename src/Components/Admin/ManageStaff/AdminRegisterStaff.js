import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import { registerStaff } from '../../../Functions/staff';
import { useDataLayerValue } from '../../Context/DataLayer';


const handleRegister = (staff, token, navigation) => {
  registerStaff(staff, token).then(res => Alert.alert(
    res.success ? res.title : 'Erreur lors de la création',
    res.success ? res.desc : res,
    [{
      text: res.success ? 'Terminé' : 'Réessayer',
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
}


export default function AdminRegisterStaff({navigation}) {
  const [{token},] = useDataLayerValue();
  const [staff, setStaff] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: 'admin'
  });

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginVertical: 10}}>Choisissez un rôle</Text>
        <View style={styles.pickerView}>
          <Picker
            style={{height: 40}}
            prompt='Sélectionnez un rôle'
            selectedValue={staff.type}
            onValueChange={type => setStaff({...staff, type})}
          >
            <Picker.Item label='    Administrateur' value='admin'/>
            <Picker.Item label='    Barman' value='barman'/>
            <Picker.Item label='    Cuisinier' value='cook'/>
            <Picker.Item label='    Serveur' value='waiter'/>
          </Picker>
        </View>
      </View>

      <View>
        <Input placeholder='Prénom' onChangeText={firstName => setStaff({ ...staff, firstName })} />
        <Input placeholder='Nom' onChangeText={lastName => setStaff({ ...staff, lastName })} />
        <Input placeholder='Adresse email' autoCapitalize='none' onChangeText={email => setStaff({ ...staff, email })} />
        <Input placeholder='Mot de passe' secureTextEntry onChangeText={password => setStaff({ ...staff, password })} />
        <Input placeholder='Confirmer mot de passe' secureTextEntry onChangeText={passCheck => setStaff({ ...staff, passCheck })} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Créer'
          icon={<Icon
            color='white'
            name='how-to-reg'
            style={{marginRight: 10}}
          />}
          onPress={() => handleRegister(staff, token, navigation)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('AdminStaffList')}>
        <Text style={styles.roboto}>Modifier un membre existant</Text>
      </TouchableOpacity>
    </View>
  );
}
import React, { useState } from 'react';
import Picker from 'react-native-picker-select';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import { registerStaff } from '../../../Functions/staff';
import { useDataLayerValue } from '../../Context/DataLayer';


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

const handleRegister = (staff, token, navigation) => {
  registerStaff(staff, token).then(res => Alert.alert(
    res.success ? res.title : 'Erreur lors de la création',
    res.success ? res.desc : res,
    [{
      text: res.success ? 'Terminé' : 'Réessayer',
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
};


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
        <Text style={{marginBottom: 10}}>Sélectionnez un rôle</Text>
        
        <View style={styles.pickerView}>
          <Picker
            onValueChange={type => setStaff({...staff, type})}
            items={[
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Administrateur', value: 'admin', key: 0 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Barman', value: 'barman', key: 1 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Cuisinier', value: 'cook', key: 2 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Serveur', value: 'waiter', key: 3 }
            ]}
            placeholder={{}}
            value={staff.type}
            style={pickerStyle}
            Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
          />
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
        <Text style={styles.link}>Modifier un membre existant</Text>
      </TouchableOpacity>
    </View>
  );
}
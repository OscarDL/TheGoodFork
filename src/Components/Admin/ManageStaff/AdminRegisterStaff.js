import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native';

import { styles } from '../../../Shared/styles';
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

const handleRegister = (staff, token) => {
  registerStaff(staff, token).then(res => (
    Toast.show({
      text1: res.title ?? 'Erreur de création',
      text2: res.desc ?? res,
      
      position: 'bottom',
      visibilityTime: 1500,
      type: res.success ? 'success' : 'error'
    })
  ));
};


export default function AdminRegisterStaff({navigation}) {
  const [{token}] = useDataLayerValue();
  const [staff, setStaff] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: 'admin'
  });

  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom: 10}}>Sélectionnez un rôle</Text>
        
        <View style={styles.pickerView}>
          <Picker
            onValueChange={type => setStaff({...staff, type})}
            items={[
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Administrateur', value: 'admin', key: 0 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Barman', value: 'barman', key: 1 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Cuisinier', value: 'cook', key: 2 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Serveur', value: 'waiter', key: 3 }
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
        <Input placeholder='Adresse email' keyboardType='email-address' autoCapitalize='none' onChangeText={email => setStaff({ ...staff, email })} />
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
          onPress={() => handleRegister(staff, token)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('AdminStaffList')}>
        <Text style={styles.link}>Modifier un membre existant</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
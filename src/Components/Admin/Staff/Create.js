import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';

import { styles } from '../../../Shared/styles';
import { createStaff } from '../../../Functions/staff';
import { useDataLayerValue } from '../../../Context/DataLayer';
import { colors } from '../../../Shared/colors';


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


export default function AdminRegisterStaff({navigation, route}) {
  const [{token}] = useDataLayerValue();
  const [staff, setStaff] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: route.params.type ?? 'admin'
  });


  const handleCreate = () => {
    createStaff(staff, token).then(res => (
      Toast.show({
        text1: res.title ?? 'Erreur de création',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      })
    ));
  };


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
        <View style={{flexDirection: 'row'}}>
          <Input
            placeholder='Prénom'
            containerStyle={{width: '50%'}}
            placeholderTextColor={colors.accentSecondary}
            onChangeText={firstName => setStaff({ ...staff, firstName })}
          />
          <Input
            placeholder='Nom'
            containerStyle={{width: '50%'}}
            placeholderTextColor={colors.accentSecondary}
            onChangeText={lastName => setStaff({ ...staff, lastName })}
          />
        </View>
        
        <Input
          autoCapitalize='none'
          placeholder='Adresse email'
          keyboardType='email-address'
          placeholderTextColor={colors.accentSecondary}
          onChangeText={email => setStaff({ ...staff, email })}
        />
        
        <View style={{flexDirection: 'row'}}>
          <Input
            secureTextEntry
            placeholder='Mot de passe'
            containerStyle={{width: '50%'}}
            placeholderTextColor={colors.accentSecondary}
            onChangeText={password => setStaff({ ...staff, password })}
          />
          <Input
            secureTextEntry
            placeholder='Confirmation'
            containerStyle={{width: '50%'}}
            placeholderTextColor={colors.accentSecondary}
            onChangeText={passCheck => setStaff({ ...staff, passCheck })}
          />
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          icon={<Icon
            color='white'
            name='how-to-reg'
            style={{marginRight: 10}}
          />}
          title='Créer'
          onPress={handleCreate}
          buttonStyle={[styles.button]}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Button, Input, Icon } from 'react-native-elements';
import { TouchableWithoutFeedback, Keyboard, View, Platform, KeyboardAvoidingView } from 'react-native';

import Text from '../../Shared/Text';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { createStaff } from '../../../Functions/staff';


const pickerStyle = {
  inputIOS: styles.pickerInput,
  inputAndroid: styles.pickerInput,
  iconContainer: styles.pickerIconContainer
};


export default function AdminRegisterStaff({navigation, route}) {
  const [staff, setStaff] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: route.params.type ?? 'admin'
  });
  
  const handleCreate = () => {
    createStaff(staff).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de création',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && navigation.goBack();
    });
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
              value={staff.type}
              style={pickerStyle}
              useNativeAndroidPickerStyle={false}
              onValueChange={type => setStaff({...staff, type})}
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
            title='Enregistrer'
            onPress={handleCreate}
            buttonStyle={[styles.button]}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
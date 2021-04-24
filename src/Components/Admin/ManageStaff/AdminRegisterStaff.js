import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { styles } from '../../../Reusables/Styles';
import { registerStaff } from '../../../Functions/staff';
import { useDataLayerValue } from '../../Context/DataLayer';


const handleRegister = (staff, token, navigation) => {
  registerStaff(staff, token).then(res => Alert.alert(
    res.success ? res.title : "Could not register staff member",
    res.success ? res.desc : res,
    [{
      text: res.success ? "DONE" : "RETRY",
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
        <Text style={{marginVertical: 10}}>Choose your staff member's role</Text>
        <View style={styles.pickerView}>
          <Picker
            style={{height: 40}}
            prompt="Select a role"
            selectedValue={staff.type}
            onValueChange={type => setStaff({...staff, type})}
          >
            <Picker.Item label="    admin" value="admin"/>
            <Picker.Item label="    barman" value="barman"/>
            <Picker.Item label="    cook" value="cook"/>
            <Picker.Item label="    waiter" value="waiter"/>
          </Picker>
        </View>
      </View>

      <View>
        <Input placeholder='First name' onChangeText={firstName => setStaff({ ...staff, firstName })} />
        <Input placeholder='Last name' onChangeText={lastName => setStaff({ ...staff, lastName })} />
        <Input placeholder='Email address' autoCapitalize='none' onChangeText={email => setStaff({ ...staff, email })} />
        <Input placeholder='Password' secureTextEntry onChangeText={password => setStaff({ ...staff, password })} />
        <Input placeholder='Confirm password' secureTextEntry onChangeText={passCheck => setStaff({ ...staff, passCheck })} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Register'
          icon={<Icon
            size={28}
            color='white'
            type='material'
            name='how-to-reg'
            style={{marginRight: 10}}
          />}
          onPress={() => handleRegister(staff, token, navigation)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('AdminStaffList')}>
        <Text style={styles.roboto}>Edit a staff member instead?</Text>
      </TouchableOpacity>
    </View>
  );
}
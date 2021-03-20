import axios from 'axios';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { styles } from '../../Reusables/Styles';


export default function AdminRegisterStaff({navigation}) {

  const [staff, setStaff] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passCheck: '',
    type: 'admin'
  });

  const registerStaff = async (staff) => {

    for (const [_, value] of Object.entries(staff)) {
      if (value === '') {
        Alert.alert(
          "Incomplete registration",
          "Please fill in all the fields.",
          [{ text: 'DISMISS' }]
        );
        return;
      }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    if (staff?.password !== staff?.passCheck) {
      Alert.alert(
        "Couldn't register staff",
        "Passwords do not match.",
        [{ text: 'RETRY' }]
      );
      return;
    }

    try {
      const {data} = await axios.post('https://the-good-fork.herokuapp.com/api/auth/register', staff, config);

      if (data?.token) {

        Alert.alert(
          "Registration successful",
          "Your new staff account is ready.",
          [{
            text: 'DONE',
            onPress: () => navigation.goBack()
          }]
        );
        
      } else {
        Alert.alert(
          "Couldn't register staff",
          data?.error,
          [{ text: 'RETRY' }]
        );
      }
      
    } catch (error) {
      Alert.alert(
        "Couldn't register staff",
        error.response.data.error,
        [{ text: 'RETRY' }]
      );
    }

  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginVertical: 10}}>Choose your staff member's role</Text>
        <View style={{height: 10}}></View>

        <View style={{width: '50%', height: 42, padding: 1, borderWidth: 1, borderColor: '#bbb', borderRadius: 4, backgroundColor: 'white'}}>
          <Picker
            style={{height: 38}}
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
        <Input placeholder='Email address' onChangeText={email => setStaff({ ...staff, email })} />
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
          onPress={() => registerStaff(staff)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => navigation.navigate('AdminStaffList')}>
        <Text style={styles.roboto}>Edit a staff member instead?</Text>
      </TouchableOpacity>
    </View>
  );
}
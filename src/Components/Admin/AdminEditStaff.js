import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../Reusables/Styles';


const editStaff = async (id, staff, navigation) => {

  for (const [_, value] of Object.entries(staff)) {
    if (value === '') {
      Alert.alert(
        "Staff account incomplete",
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

  try {
    staff.email = staff.email.replace(' ', '');
    const {data} = await axios.put('https://the-good-fork.herokuapp.com/api/admin/accounts/updateStaff/' + id, staff, config);

    if (data?.success) {
      Alert.alert(
        staff.firstName + ' ' + staff.lastName,
        data?.data,
        [{ text: 'DONE', onPress: () => navigation.goBack() }]
      );
    }

  } catch (error) {
    Alert.alert(
      `Couldn't update ${staff.firstName} ${staff.lastName}`,
      error.response.data.error || "Unknown error.",
      [{ text: 'RETRY' }]
    );
  }
}

const deleteStaff = (staff, navigation) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  Alert.alert(
    "Are you sure?",
    `You're about to delete ${staff.firstName} ${staff.lastName}'s account.`,
    [
      { text: 'CANCEL' },
      { text: 'CONTINUE',
        onPress: async () => {

          try {
            const {data} = await axios.delete('https://the-good-fork.herokuapp.com/api/admin/accounts/deleteStaff/' + staff._id, config);
        
            if (data?.success) {
              Alert.alert(
                staff.firstName + ' ' + staff.lastName,
                data?.data,
                [{ text: 'DONE', onPress: () => navigation.goBack() }]
              );
            }
        
          } catch (error) {
            Alert.alert(
              `Couldn't update ${staff.firstName} ${staff.lastName}`,
              error.response.data.error || "Unknown error.",
              [{ text: 'RETRY' }]
            );
          }

        }
      }
    ]
  );  
}


export default function AdminEditStaff({route, navigation}) {

  const {staff} = route.params;

  const [newStaff, setNewStaff] = useState({
    firstName: staff.firstName,
    lastName: staff.lastName,
    email: staff.email,
    type: staff.type
  });


  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginVertical: 10}}>Choose your staff member's role</Text>
        <View style={{height: 10}}></View>

        <View style={{width: '50%', height: 42, padding: 1, borderWidth: 1, borderColor: '#bbb', borderRadius: 4, backgroundColor: 'white'}}>
          <Picker
            style={{height: 38}}
            prompt="Select a role"
            selectedValue={newStaff.type}
            onValueChange={type => setNewStaff({...newStaff, type})}
          >
            <Picker.Item label="    admin" value="admin"/>
            <Picker.Item label="    barman" value="barman"/>
            <Picker.Item label="    cook" value="cook"/>
            <Picker.Item label="    waiter" value="waiter"/>
          </Picker>
        </View>
      </View>

      <View>
        <Input value={newStaff.firstName} onChangeText={firstName => setNewStaff({ ...newStaff, firstName })} />
        <Input value={newStaff.lastName} onChangeText={lastName => setNewStaff({ ...newStaff, lastName })} />
        <Input value={newStaff.email} autoCapitalize='none' onChangeText={email => setNewStaff({ ...newStaff, email })} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Update'
          icon={<Icon
            size={26}
            name='edit'
            color='white'
            type='font-awesome-5'
            style={{marginRight: 10, marginBottom: 3}}
          />}
          onPress={() => editStaff(staff._id, newStaff, navigation)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => deleteStaff(staff, navigation)}>
        <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Delete {staff.firstName} {staff.lastName}</Text>
      </TouchableOpacity>
    </View>
  );
}
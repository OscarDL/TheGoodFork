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
    res.success ? res.title : "Could not edit staff member",
    res.success ? res.desc : res,
    [{
      text: res.success ? "DONE" : "RETRY",
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
}

const handleDelete = (staff, token, navigation) => {
  Alert.alert(
    "Are you sure?",
    `You're about to delete ${staff.firstName} ${staff.lastName}.`,
    [
      { text: 'CANCEL' },
      { text: 'CONTINUE',
        onPress: () => deleteStaff(staff, token).then(res => Alert.alert(
          res.success ? res.title : "Could not delete staff member",
          res.success ? res.desc : res,
          [{
            text: res.success ? "DONE" : "RETRY",
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
        <Input placeholder='Change password' secureTextEntry onChangeText={password => setNewStaff({ ...newStaff, password })} />
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
          onPress={() => handleEdit(params._id, newStaff, token, navigation)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => handleDelete(params, token, navigation)}>
        <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Delete {params.firstName} {params.lastName}</Text>
      </TouchableOpacity>
    </View>
  );
}
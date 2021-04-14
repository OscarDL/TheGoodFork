import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import { editDish, deleteDish } from '../../../Functions/dishes';


const handleEdit = (token, id, dish, navigation) => {
  editDish(token, id, dish).then(res => Alert.alert(
    res.success ? res.title : "Could not edit dish",
    res.success ? res.desc : res,
    [{
      text: res.success ? "DONE" : "RETRY",
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
}

const handleDelete = (token, dish, navigation) => {
  Alert.alert(
    "Are you sure?",
    `You're about to delete ${dish.name}.`,
    [
      { text: 'CANCEL' },
      { text: 'CONTINUE',
        onPress: () => deleteDish(token, dish._id, dish).then(res => Alert.alert(
          res.success ? res.title : "Could not delete dish",
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


export default function AdminEditDish({route, navigation}) {

  const {params} = route.params;
  const [{token}, _] = useDataLayerValue();

  const [newDish, setNewDish] = useState({
    name: params.name,
    detail: params.detail,
    price: params.price,
    type: params.type
  });


  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginVertical: 10}}>Modifiez votre menu</Text>
        <View style={{height: 10}}></View>

        <View style={{...styles.pickerView, height: 42}}>
          <Picker
            style={{height: 38}}
            prompt="Select a type"
            selectedValue={newDish.type}
            onValueChange={type => setNewDish({...newDish, type})}
          >
            <Picker.Item label="    Entrée"   value="appetizer"/>
            <Picker.Item label="    Plat"     value="mainDish"/>
            <Picker.Item label="    Dessert"  value="dessert"/>
            <Picker.Item label="    Boisson"  value="drink"/>
            <Picker.Item label="    Alcool"   value="alcohol"/>
          </Picker>
        </View>
      </View>

      <View>
        <Input value={newDish.name} onChangeText={name => setNewDish({...newDish, name})}/>
        <Input value={newDish.detail} placeholder='Aucun détail' onChangeText={detail => setNewDish({...newDish, detail})}/>
        <Input value={newDish.price.toString()} keyboardType='number-pad' onChangeText={price => setNewDish({...newDish, price: price.replace(',', '.')})} />
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
          onPress={() => handleEdit(token, params._id, newDish, navigation)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => handleDelete(token, params, navigation)}>
        <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Delete {params.name}</Text>
      </TouchableOpacity>
    </View>
  );
}
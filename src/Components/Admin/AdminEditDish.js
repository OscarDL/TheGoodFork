import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';


const editDish = async (token, id, dish, navigation) => {

  for (const [_, value] of Object.entries(dish)) {
    if (value === '') {
      Alert.alert(
        "Dish incomplete",
        "Please fill in all the fields.",
        [{ text: 'DISMISS' }]
      );
      return;
    }
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  try {
    const {data} = await axios.put('https://the-good-fork.herokuapp.com/api/dishes/edit/' + id, dish, config);

    if (data?.success) {
      Alert.alert(
        dish.name,
        data?.data,
        [{ text: 'DONE', onPress: () => navigation.goBack() }]
      );
    }

  } catch (error) {
    Alert.alert(
      `Couldn't update ${dish.name}`,
      error.response.data.error || "Unknown error.",
      [{ text: 'RETRY' }]
    );
  }
}

const deleteDish = (token, dish, navigation) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
  
  Alert.alert(
    "Are you sure?",
    `You're about to delete ${dish.name}.`,
    [
      { text: 'CANCEL' },
      { text: 'CONTINUE',
        onPress: async () => {

          try {
            const {data} = await axios.delete('https://the-good-fork.herokuapp.com/api/dishes/delete/' + dish._id, config);
        
            if (data?.success) {
              Alert.alert(
                dish.name,
                data?.data,
                [{ text: 'DONE', onPress: () => navigation.goBack() }]
              );
            }
        
          } catch (error) {
            Alert.alert(
              `Couldn't update ${dish.name}`,
              error.response.data.error || "Unknown error.",
              [{ text: 'RETRY' }]
            );
          }

        }
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

        <View style={{width: '50%', height: 42, padding: 1, borderWidth: 1, borderColor: '#bbb', borderRadius: 4, backgroundColor: 'white'}}>
          <Picker
            style={{height: 38}}
            prompt="Select a type"
            onValueChange={type => {setNewDish({...newDish, type}); console.log(type)}}
          >
            <Picker.Item label="    Entrée"   value="entree"/>
            <Picker.Item label="    Plat"     value="mainDish"/>
            <Picker.Item label="    Dessert"  value="dessert"/>
            <Picker.Item label="    Boisson"  value="drink"/>
            <Picker.Item label="    Alcool"   value="alcohol"/>
          </Picker>
        </View>
      </View>

      <View>
        <Input value={newDish.name} onChangeText={name => setNewDish({ ...newDish, name })} />
        <Input value={newDish.detail} onChangeText={detail => setNewDish({ ...newDish, detail })} />
        <Input value={newDish.price} keyboardType="number-pad" onChangeText={price => setNewDish({ ...newDish, price })} />
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
          onPress={() => editDish(token, params._id, newDish, navigation)}
        />
      </View>
      
      <Button onPress={() => deleteDish(token, params, navigation)} title="delete"/>
    </View>
  );
}
import axios from 'axios';
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Input, Icon } from 'react-native-elements';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';


export default function AdminCreateDish({navigation}) {

  const [{token}, _] = useDataLayerValue();
  const [dish, setDish] = useState({
    type: 'appetizer',
    price: 0,
    name: '',
    detail: '',
  });

  const createDish = async (dish) => {

    for (const [key, value] of Object.entries(dish)) {
      if (value === '' && key !== 'detail') {
        Alert.alert(
          "Incomplete dish",
          "Please fill in all the required fields.",
          [{ text: 'DISMISS' }]
        );
        return;
      }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    

    try {
      const {data} = await axios.post('https://the-good-fork.herokuapp.com/api/dishes/create', dish, config);

      if (data?.success) {

        Alert.alert(
          "Successfully created",
          "Your new dish is ready.",
          [{
            text: 'DONE',
            onPress: () => navigation.goBack()
          }]
        );
        
      } else {
        Alert.alert(
          "Couldn't create dish",
          data?.error,
          [{ text: 'RETRY' }]
        );
      }
      
    } catch (error) {
      Alert.alert(
        "Couldn't create dish",
        error.response.data.error,
        [{ text: 'RETRY' }]
      );
    }

  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={{height: 10}}></View>

        <View style={{width: '50%', height: 42, padding: 1, borderWidth: 1, borderColor: '#bbb', borderRadius: 4, backgroundColor: 'white'}}>
          <Picker
            style={{height: 38}}
            prompt="Select a type"
            selectedValue={dish.type}
            onValueChange={type => setDish({...dish, type})}
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
        <Input placeholder='Nom' onChangeText={name => setDish({ ...dish, name })} />
        <Input placeholder='Prix en euro' onChangeText={price => setDish({ ...dish, price })} />
        <Input placeholder='Détails' onChangeText={detail => setDish({ ...dish, detail })} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Ajouter'
          icon={<Icon
            size={28}
            color='white'
            type='material'
            name='how-to-reg'
            style={{marginRight: 10}}
          />}
          onPress={() => createDish(dish)}
        />
      </View>
    </View>
  );
}
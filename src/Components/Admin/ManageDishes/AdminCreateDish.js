import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Input, Icon } from 'react-native-elements';

import { styles } from '../../../Reusables/Styles';
import { createDish } from '../../../Functions/dishes';
import { useDataLayerValue } from '../../Context/DataLayer';


const handleCreate = (dish, token, navigation) => {
  createDish(dish, token).then(res => Alert.alert(
    res.success ? res.title : 'Erreur lors de la création',
    res.success ? res.desc : res,
    [{
      text: res.success ? 'Terminé' : 'Réessayer',
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
}


export default function AdminCreateDish({navigation}) {

  const [{token}, _] = useDataLayerValue();
  const [dish, setDish] = useState({
    type: 'appetizer',
    detail: '',
    price: 0,
    name: ''
  });


  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={{height: 10}}></View>

        <View style={styles.pickerView}>
          <Picker
            style={{height: 40}}
            prompt='Sélectionnez le type'
            selectedValue={dish.type}
            onValueChange={type => setDish({...dish, type})}
          >
            <Picker.Item label='    Entrée'   value='appetizer'/>
            <Picker.Item label='    Plat'     value='mainDish'/>
            <Picker.Item label='    Dessert'  value='dessert'/>
            <Picker.Item label='    Boisson'  value='drink'/>
            <Picker.Item label='    Alcool'   value='alcohol'/>
          </Picker>
        </View>
      </View>

      <View>
        <Input placeholder='Nom' onChangeText={name => setDish({...dish, name})}/>
        <Input placeholder='Détails' onChangeText={detail => setDish({...dish, detail})}/>
        <Input placeholder='Prix en euro' keyboardType='number-pad' onChangeText={price => setDish({...dish, price: price.replace(',', '.')})}/>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Ajouter'
          icon={<Icon
            name='create'
            color='white'
            style={{marginRight: 10}}
          />}
          onPress={() => handleCreate(dish, token, navigation)}
        />
      </View>
    </View>
  );
}
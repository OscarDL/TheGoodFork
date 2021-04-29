import React, { useState } from 'react';
import Picker from 'react-native-picker-select';
import { View, Alert, Text, Platform } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';

import { styles } from '../../../Reusables/Styles';
import { createDish } from '../../../Functions/dishes';
import { useDataLayerValue } from '../../Context/DataLayer';


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

const handleCreate = (dish, token, navigation) => {
  createDish({...dish, stock: (!dish.stock ? null : dish.stock)}, token).then(res => Alert.alert(
    res.success ? res.title : 'Erreur lors de la création',
    res.success ? res.desc : res,
    [{
      text: res.success ? 'Terminé' : 'Réessayer',
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
};


export default function AdminCreateDish({navigation}) {

  const [{token}, _] = useDataLayerValue();
  const [dish, setDish] = useState({
    name: '',
    price: 0,
    detail: '',
    stock: null,
    type: 'appetizer'
  });


  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom: 10}}>Sélectionnez le type</Text>
        
        <View style={styles.pickerView}>
          <Picker
            prompt='Sélectionnez le type'
            onValueChange={type => setDish({...dish, type})}
            items={[
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Entrée', value: 'appetizer', key: 0 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Plat', value: 'mainDish', key: 1 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Dessert', value: 'dessert', key: 2 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Boisson', value: 'drink', key: 3 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Boisson alcoolisée', value: 'alcohol', key: 3 }
            ]}
            placeholder={{}}
            value={dish.type}
            style={pickerStyle}
            Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
          />
        </View>
      </View>

      <View>
        <Input placeholder='Nom' onChangeText={name => setDish({...dish, name})}/>
        <Input placeholder='Détails' onChangeText={detail => setDish({...dish, detail})}/>
        <Input placeholder='Prix (EUR)' keyboardType='number-pad' onChangeText={price => setDish({...dish, price: price.replace(',', '.')})}/>
        <Input placeholder='Stock (le cas échéant)' onChangeText={stock => setDish({...dish, stock})}/>
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
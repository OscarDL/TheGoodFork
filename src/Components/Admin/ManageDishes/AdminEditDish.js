import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Alert, Platform, KeyboardAvoidingView } from 'react-native';

import { styles } from '../../../Shared/styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import { editDish, deleteDish } from '../../../Functions/dishes';


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

const handleEdit = (token, id, dish, navigation) => {
  if (!dish.stock) dish.stock = null;

  editDish(token, id, dish).then(res => {
    Toast.show({
      text1: res.title ?? 'Erreur de modification',
      text2: res.desc ?? res,
      
      position: 'bottom',
      visibilityTime: 1500,
      type: res.success ? 'success' : 'error'
    });
    res.success && navigation.goBack();
  });
};

const handleDelete = (token, dish, navigation) => {
  Alert.alert(
    'Êtes-vous sûr ?',
    `Vous êtes sur le point de supprimer "${dish.name}".`,
    [
      { text: 'Annuler' },
      { text: 'Supprimer',
        onPress: () => deleteDish(token, dish._id, dish).then(res => {
          Toast.show({
            text1: res.title ?? 'Erreur de supression',
            text2: res.desc ?? res,
            
            position: 'bottom',
            visibilityTime: 1500,
            type: res.success ? 'success' : 'error'
          });
          res.success && navigation.goBack();
        })
      }
    ]
  );
};


export default function AdminEditDish({route, navigation}) {
  const {dish} = route.params;
  const [{token}] = useDataLayerValue();

  const [newDish, setNewDish] = useState({
    name: dish.name,
    type: dish.type,
    price: dish.price,
    stock: dish.stock,
    detail: dish.detail
  });


  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom: 10}}>Sélectionnez le type</Text>
        
        <View style={styles.pickerView}>
          <Picker
            onValueChange={type => setNewDish({...newDish, type})}
            items={[
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Entrée', value: 'appetizer', key: 0 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Plat', value: 'mainDish', key: 1 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Dessert', value: 'dessert', key: 2 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Boisson', value: 'drink', key: 3 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Boisson alcoolisée', value: 'alcohol', key: 3 }
            ]}
            placeholder={{}}
            style={pickerStyle}
            value={newDish.type}
            Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
          />
        </View>
      </View>

      <View>
        <Input value={newDish.name} placeholder='Nom' onChangeText={name => setNewDish({...newDish, name})}/>
        <Input value={newDish.detail} placeholder='Aucun détail' onChangeText={detail => setNewDish({...newDish, detail})}/>
        <Input value={newDish.price.toString()} placeholder='Prix (EUR)' keyboardType='number-pad' onChangeText={price => setNewDish({...newDish, price: price.replace(',', '.')})} />
        <Input value={newDish.stock?.toString()} placeholder='Stock (le cas échéant)' onChangeText={stock => setNewDish({...newDish, stock})}/>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          buttonStyle={[styles.button]}
          title='Sauvegarder'
          icon={<Icon
            name='save'
            color='white'
            style={{marginRight: 10}}
          />}
          onPress={() => handleEdit(token, dish._id, newDish, navigation)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => handleDelete(token, dish, navigation)}>
        <Text style={styles.delete}>Supprimer</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
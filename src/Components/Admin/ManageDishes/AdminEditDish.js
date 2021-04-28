import React, { useState } from 'react';
import Picker from 'react-native-picker-select';
import { View, Text, Alert, Platform } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
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
  editDish(token, id, dish).then(res => Alert.alert(
    res.success ? res.title : 'Erreur lors de la modification',
    res.success ? res.desc : res,
    [{
      text: res.success ? 'Terminé' : 'Réessayer',
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
};

const handleDelete = (token, dish, navigation) => {
  Alert.alert(
    'Êtes-vous sûr ?',
    `Vous êtes sur le point de supprimer "${dish.name}".`,
    [
      { text: 'Annuler' },
      { text: 'Supprimer',
        onPress: () => deleteDish(token, dish._id, dish).then(res => Alert.alert(
          res.success ? res.title : 'Erreur lors de la suppression',
          res.success ? res.desc : res,
          [{
            text: res.success ? 'Terminé' : 'Réessayer',
            onPress: () => res.success ? navigation.goBack() : null
          }]
        ))
      }
    ]
  );
};


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
        <Text style={{marginBottom: 10}}>Sélectionnez le type</Text>
        
        <View style={styles.pickerView}>
          <Picker
            onValueChange={type => setNewDish({...newDish, type})}
            items={[
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Entrée', value: 'appetizer', key: 0 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Plat', value: 'mainDish', key: 1 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Dessert', value: 'dessert', key: 2 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Boisson', value: 'drink', key: 3 },
              { label: (Platform.OS !== 'ios' ? '  ' : '') + 'Boisson alcoolisée', value: 'alcohol', key: 3 }
            ]}
            placeholder={{}}
            value={newDish.type}
            style={pickerStyle}
            Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
          />
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
          title='Sauvegarder'
          icon={<Icon
            name='save'
            color='white'
            style={{marginRight: 10}}
          />}
          onPress={() => handleEdit(token, params._id, newDish, navigation)}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => handleDelete(token, params, navigation)}>
        <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
}
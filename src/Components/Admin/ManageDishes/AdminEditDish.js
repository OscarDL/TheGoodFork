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


export default function AdminEditDish({route, navigation}) {
  const {dish} = route.params;
  const [{token}] = useDataLayerValue();

  const [newDish, setNewDish] = useState(dish);


  const handleEdit = () => {
    editDish(token, dish._id, {...newDish, stock: newDish.stock || null}).then(res => {
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

  const handleDelete = () => {
    const actions = [
      {
        text: 'Supprimer',
        style: 'destructive',
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
      }, {
        text: 'Annuler',
        style: 'cancel'
      }
    ];
  
    Alert.alert(
      'Êtes-vous sûr ?',
      `Vous êtes sur le point de supprimer "${dish.name}".`,
      Platform.OS === 'ios' ? actions : actions.reverse()
    );
  };


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
        <View style={{flexDirection: 'row'}}>
          <Input
            keyboardType='numeric'
            placeholder='Prix (EUR)'
            containerStyle={{width:'30%'}}
            value={newDish.price.toString()}
            onChangeText={price => setNewDish({...newDish, price: price.replace(',', '.')})}
          />
          <Input
            keyboardType='numeric'
            containerStyle={{width:'70%'}}
            value={newDish.stock?.toString()}
            placeholder='Stock (le cas échéant)'
            onChangeText={stock => setNewDish({...newDish, stock: stock.replace(/[^0-9]/g, '')})}
          />
        </View>
        <Input value={newDish.image} placeholder='Image (URL cloudinary)' onChangeText={image => setNewDish({...newDish, image})}/>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button
          icon={<Icon
            name='edit'
            color='white'
            style={{marginRight: 10}}
          />}
          title='Modifier'
          onPress={handleEdit}
          buttonStyle={[styles.button]}
        />
      </View>
      
      <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={handleDelete}>
        <Text style={styles.delete}>Supprimer</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
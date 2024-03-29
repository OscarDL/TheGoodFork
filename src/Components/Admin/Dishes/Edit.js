import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Button, Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback, Keyboard, View, Alert, Platform, KeyboardAvoidingView } from 'react-native';

import Text from '../../Shared/Text'
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { editDish, deleteDish } from '../../../Functions/dishes';


const pickerStyle = {
  inputIOS: styles.pickerInput,
  inputAndroid: styles.pickerInput,
  iconContainer: styles.pickerIconContainer
};


export default function AdminEditDish({route, navigation}) {
  const {dish} = route.params;
  const [newDish, setNewDish] = useState(dish);


  const handleEdit = () => {
    editDish({...newDish, stock: newDish.stock || null}).then(res => {
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
        onPress: () => deleteDish(dish).then(res => {
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
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' ? Keyboard.dismiss() : null} accessible={false}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <View style={{alignItems: 'center'}}>
          <Text style={{marginBottom: 10}}>Sélectionnez le type</Text>
          
          <View style={styles.pickerView}>
            <Picker
              items={[
                { label: 'Entrée', value: 'appetizer', key: 0 },
                { label: 'Plat', value: 'mainDish', key: 1 },
                { label: 'Dessert', value: 'dessert', key: 2 },
                { label: 'Boisson', value: 'drink', key: 3 },
                { label: 'Alcool', value: 'alcohol', key: 3 }
              ]}
              placeholder={{}}
              style={pickerStyle}
              value={newDish.type}
              useNativeAndroidPickerStyle={false}
              onValueChange={type => setNewDish({...newDish, type})}
              Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
            />
          </View>
        </View>

        <View>
          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Nom</Text>
          <Input value={newDish.name} onChangeText={name => setNewDish({...newDish, name})}/>
          
          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Détails</Text>
          <Input value={newDish.detail} placeholder='Aucun détail' onChangeText={detail => setNewDish({...newDish, detail})}/>
          
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '30%'}}>
              <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Prix (EUR)</Text>
              <Input
                keyboardType='numeric'
                value={String(newDish.price ?? '')}
                onChangeText={price => setNewDish({...newDish, price: price.replace(',', '.')})}
              />
            </View>
            <View style={{width: '70%'}}>
              <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Stock (le cas échéant)</Text>
              <Input
                keyboardType='numeric'
                value={String(newDish.stock ?? '')}
                onChangeText={stock => setNewDish({...newDish, stock: stock.replace(/[^0-9]/g, '')})}
              />
            </View>
          </View>

          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Image (URL Cloudinary)</Text>
          <Input value={newDish.image} onChangeText={image => setNewDish({...newDish, image})}/>
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
            buttonStyle={[{...styles.button, marginBottom: 20}]}
          />
        
          <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={handleDelete}>
            <Text style={styles.delete}>Supprimer {dish.name}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
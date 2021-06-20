import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Button, Input, Icon } from 'react-native-elements';
import { TouchableWithoutFeedback, Keyboard, View, Platform, KeyboardAvoidingView } from 'react-native';

import Text from '../../Shared/Text';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { createDish } from '../../../Functions/dishes';


const pickerStyle = {
  inputIOS: styles.pickerInput,
  inputAndroid: styles.pickerInput,
  iconContainer: styles.pickerIconContainer
};


export default function AdminCreateDish({navigation, route}) {
  const [dish, setDish] = useState({
    name: '',
    image: '',
    detail: '',
    price: null,
    stock: null,
    type: route.params.type ?? 'appetizer'
  });

  const handleCreate = () => {
    createDish({...dish, stock: dish.stock || null}).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de création',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && navigation.goBack();
    });
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
              value={dish.type}
              style={pickerStyle}
              useNativeAndroidPickerStyle={false}
              onValueChange={type => setDish({...dish, type})}
              Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
            />
          </View>
        </View>

        <View>
          <Input placeholder='Nom' placeholderTextColor={colors.accentSecondary} onChangeText={name => setDish({...dish, name})}/>
          <Input placeholder='Détails' placeholderTextColor={colors.accentSecondary} onChangeText={detail => setDish({...dish, detail})}/>

          <View style={{flexDirection: 'row'}}>
            <Input
              value={dish.price}
              keyboardType='numeric'
              placeholder='Prix (EUR)'
              containerStyle={{width:'30%'}}
              placeholderTextColor={colors.accentSecondary}
              onChangeText={price => setDish({...dish, price: price.replace(',', '.')})}
            />
            <Input
              value={dish.stock}
              keyboardType='numeric'
              containerStyle={{width:'70%'}}
              placeholder='Stock (le cas échéant)'
              placeholderTextColor={colors.accentSecondary}
              onChangeText={stock => setDish({...dish, stock: stock.replace(/[^0-9]/g, '')})}
            />
          </View>
          
          <Input
            value={dish.image}
            placeholder='Image (URL Cloudinary)'
            placeholderTextColor={colors.accentSecondary}
            onChangeText={image => setDish({...dish, image})}
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <Button
            icon={<Icon
              color='white'
              name='restaurant'
              style={{marginRight: 10}}
            />}
            title='Ajouter'
            onPress={handleCreate}
            buttonStyle={[styles.button]}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
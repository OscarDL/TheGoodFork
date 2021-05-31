import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { createDish } from '../../../Functions/dishes';
import { useAuthContext } from '../../../Context/Auth/Provider';


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


export default function AdminCreateDish({navigation, route}) {
  const [{token}] = useAuthContext();
  const [dish, setDish] = useState({
    name: '',
    image: '',
    detail: '',
    price: null,
    stock: null,
    type: route.params.type ?? 'appetizer'
  });


  const handleCreate = () => {
    createDish({...dish, stock: dish.stock || null}, token).then(res => {
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
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom: 10}}>Sélectionnez le type</Text>
        
        <View style={styles.pickerView}>
          <Picker
            onValueChange={type => setDish({...dish, type})}
            items={[
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Entrée', value: 'appetizer', key: 0 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Plat', value: 'mainDish', key: 1 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Dessert', value: 'dessert', key: 2 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Boisson', value: 'drink', key: 3 },
              { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Boisson alcoolisée', value: 'alcohol', key: 3 }
            ]}
            placeholder={{}}
            value={dish.type}
            style={pickerStyle}
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
  );
}
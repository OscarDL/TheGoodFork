import { FAB } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Alert, SafeAreaView, Platform, ActivityIndicator } from 'react-native';

import Text from '../../Shared/Text';
import TouchCard from '../../Shared/TouchCard';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getDishes } from '../../../Functions/dishes';


const pickerStyle = {
  inputIOS: styles.pickerInput,
  inputAndroid: styles.pickerInput,
  iconContainer: styles.pickerIconContainer
};

const failureAlert = (error, navigation, setRetry) => {
  const actions = [
    {
      text: 'Réessayer',
      onPress: () => setRetry(true)
    }, {
      text: 'Annuler',
      style: 'cancel',
      onPress: () => navigation.goBack()
    }
  ];

  Alert.alert(
    "Erreur d'affichage des plats", error,
    Platform.OS === 'ios' ? actions : actions.reverse()
  );
};


export default function AdminDishes({navigation}) {
  const isFocused = useIsFocused();
  const [type, setType] = useState('all');
  const [retry, setRetry] = useState(false);
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    if (isFocused || retry) getDishes().then(res => {
      res.success ? setDishes(res.dishes) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry, setDishes]);


  return dishes ? (
    <SafeAreaView style={styles.container}>
      {dishes.length > 0 ? (
        <ScrollView contentContainerStyle={{paddingVertical: 5}}>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Text style={{marginBottom: 10}}>Catégorie à afficher</Text>
            
            <View style={styles.pickerView}>
              <Picker
                items={[
                  { label: 'Tous les plats', value: 'all', key: 0 },
                  { label: 'Entrées', value: 'appetizer', key: 1 },
                  { label: 'Plats', value: 'mainDish', key: 2 },
                  { label: 'Desserts', value: 'dessert', key: 3 },
                  { label: 'Boissons', value: 'drink', key: 4 },
                  { label: 'Alcools', value: 'alcohol', key: 5 }
                ]}
                value={type}
                placeholder={{}}
                style={pickerStyle}
                onValueChange={type => setType(type)}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
              />
            </View>
          </View>

          <View>
            {(type === 'appetizer' || type === 'all') && <>
              <Text style={styles.title}>Entrées</Text>
              {dishes.filter(dish => dish.type === 'appetizer').sort((a, b) => a.name.localeCompare(b.name)).map((dish, i) => (
                <TouchCard key={i} image={dish.image} navigation={navigation} screen='AdminEditDish'
                description={dish.detail || 'Pas de détails'} params={{dish}} title={dish.name}
                subtitle={`${dish.price} ${dish.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}/>
              ))}
            </>}

            {(type === 'mainDish' || type === 'all') && <>
              <Text style={styles.title}>Plats</Text>
              {dishes.filter(dish => dish.type === 'mainDish').sort((a, b) => a.name.localeCompare(b.name)).map((dish, i) => (
                <TouchCard key={i} image={dish.image} navigation={navigation} screen='AdminEditDish'
                description={dish.detail || 'Pas de détails'} params={{dish}} title={dish.name}
                subtitle={`${dish.price} ${dish.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}/>
              ))}
            </>}

            {(type === 'dessert' || type === 'all') && <>
              <Text style={styles.title}>Desserts</Text>
              {dishes.filter(dish => dish.type === 'dessert').sort((a, b) => a.name.localeCompare(b.name)).map((dish, i) => (
                <TouchCard key={i} image={dish.image} navigation={navigation} screen='AdminEditDish'
                description={dish.detail || 'Pas de détails'} params={{dish}} title={dish.name}
                subtitle={`${dish.price} ${dish.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}/>
              ))}
            </>}

            {(type === 'drink' || type === 'all') && <>
              <Text style={styles.title}>Boissons</Text>
              {dishes.filter(dish => dish.type === 'drink').sort((a, b) => a.name.localeCompare(b.name)).map((dish, i) => (
                <TouchCard key={i} image={dish.image} navigation={navigation} screen='AdminEditDish'
                description={dish.detail || 'Pas de détails'} params={{dish}} title={dish.name}
                subtitle={`${dish.price} ${dish.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}/>
              ))}
            </>}

            {(type === 'alcohol' || type === 'all') && <>
              <Text style={styles.title}>Boissons alcoolisées</Text>
              {dishes.filter(dish => dish.type === 'alcohol').sort((a, b) => a.name.localeCompare(b.name)).map((dish, i) => (
                <TouchCard key={i} image={dish.image} navigation={navigation} screen='AdminEditDish'
                description={dish.detail || 'Pas de détails'} params={{dish}} title={dish.name}
                subtitle={`${dish.price} ${dish.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}/>
              ))}
            </>}
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Aucun plat n'a été ajouté.</Text>
        </View>
      )}
      <FAB style={styles.fab} icon='plus' color='white' onPress={() => navigation.navigate('AdminCreateDish', {type: type === 'all' ? null : type})}/>
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={60} color={colors.accentPrimary}/>
    </View>
  );
}
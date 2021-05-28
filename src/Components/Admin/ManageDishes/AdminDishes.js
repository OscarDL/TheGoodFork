import { FAB } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView, Platform, ActivityIndicator } from 'react-native';

import BaseCard from '../../../Shared/BaseCard';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getDishes } from '../../../Functions/dishes';


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
      {dishes?.length > 0 ? (
        <ScrollView contentContainerStyle={{paddingVertical: 5}}>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Text style={{marginBottom: 10}}>Catégorie à afficher</Text>
            
            <View style={styles.pickerView}>
              <Picker
                onValueChange={type => setType(type)}
                items={[
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Tous les plats', value: 'all', key: 0 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Entrées', value: 'appetizer', key: 1 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Plats', value: 'mainDish', key: 2 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Desserts', value: 'dessert', key: 3 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Boissons', value: 'drink', key: 4 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Boissons alcoolisées', value: 'alcohol', key: 5 }
                ]}
                value={type}
                placeholder={{}}
                style={pickerStyle}
                Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
              />
            </View>
          </View>

          <View>
            {(type === 'appetizer' || type === 'all') && <>
              <Text style={styles.title}>Entrées</Text>
              {dishes?.sort((a, b) => a.name > b.name).map((dish, i) => dish.type === 'appetizer' && <BaseCard
                key={i} image={dish.image} navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}
              />)}
            </>}

            {(type === 'mainDish' || type === 'all') && <>
              <Text style={styles.title}>Plats</Text>
              {dishes?.sort((a, b) => a.name > b.name).map((dish, i) => dish.type === 'mainDish' && <BaseCard
                key={i} image={dish.image} navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}
              />)}
            </>}

            {(type === 'dessert' || type === 'all') && <>
              <Text style={styles.title}>Desserts</Text>
              {dishes?.sort((a, b) => a.name > b.name).map((dish, i) => dish.type === 'dessert' && <BaseCard
                key={i} image={dish.image} navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}
              />)}
            </>}

            {(type === 'drink' || type === 'all') && <>
              <Text style={styles.title}>Boissons</Text>
              {dishes?.sort((a, b) => a.name > b.name).map((dish, i) => dish.type === 'drink' && <BaseCard
                key={i} image={dish.image} navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}
              />)}
            </>}

            {(type === 'alcohol' || type === 'all') && <>
              <Text style={styles.title}>Boissons alcoolisées</Text>
              {dishes?.sort((a, b) => a.name > b.name).map((dish, i) => dish.type === 'alcohol' && <BaseCard
                key={i} image={dish.image} navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency}\u2000\u2013\u2000Stock : ${dish.stock ?? 'non défini'}`}
              />)}
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
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  );
}
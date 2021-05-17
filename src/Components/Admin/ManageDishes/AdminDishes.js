import { FAB } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView, Platform, ActivityIndicator } from 'react-native';

import BaseCard from '../../../Shared/BaseCard';
import { styles } from '../../../Shared/styles';
import { colors } from '../../../Shared/colors';
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

const failureAlert = (error, navigation, setRetry) => Alert.alert(
  "Erreur d'affichage des plats", error,
  [{
    text: 'Annuler',
    onPress: () => navigation.goBack()
  },
  {
    text: 'Réessayer',
    onPress: () => setRetry(true)
  }]
);


export default function AdminDishes({navigation}) {
  const [retry, setRetry] = useState(false);
  const [dishes, setDishes] = useState(null);
  const [dishType, setDishType] = useState('all');
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  useEffect(() => {
    if (isFocused || retry) getDishes().then(res => {
      res.success ? setDishes(res.dishes) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry]);


  return dishes ? (
    <SafeAreaView style={styles.container}>
      {dishes?.length > 0 ? (
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: 30, marginBottom: 15}}>
            <Text style={{marginBottom: 10}}>Catégorie à afficher</Text>
            
            <View style={styles.pickerView}>
              <Picker
                onValueChange={type => setDishType(type)}
                items={[
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Tous les plats', value: 'all', key: 0 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Entrées', value: 'appetizer', key: 1 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Plats', value: 'mainDish', key: 2 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Desserts', value: 'dessert', key: 3 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Boissons', value: 'drink', key: 4 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Boissons alcoolisées', value: 'alcohol', key: 5 }
                ]}
                placeholder={{}}
                value={dishType}
                style={pickerStyle}
                Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
              />
            </View>
          </View>

          <View style={{marginVertical: 5}}>
            {(dishType === 'appetizer' || dishType === 'all') && <>
              <Text style={styles.title}>Entrées</Text>
              {dishes?.map((dish, i) => dish.type === 'appetizer' && <BaseCard
                key={i} icon='how-to-reg' navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency} – Stock : ${dish.stock ?? 'non défini'}`}
              />)}
            </>}

            {(dishType === 'mainDish' || dishType === 'all') && <>
              <Text style={styles.title}>Plats</Text>
              {dishes?.map((dish, i) => dish.type === 'mainDish' && <BaseCard
                key={i} icon='how-to-reg' navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency} – Stock : ${dish.stock ?? 'non défini'}`}
              />)}
            </>}

            {(dishType === 'dessert' || dishType === 'all') && <>
              <Text style={styles.title}>Desserts</Text>
              {dishes?.map((dish, i) => dish.type === 'dessert' && <BaseCard
                key={i} icon='how-to-reg' navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency} – Stock : ${dish.stock ?? 'non défini'}`}
              />)}
            </>}

            {(dishType === 'drink' || dishType === 'all') && <>
              <Text style={styles.title}>Boissons</Text>
              {dishes?.map((dish, i) => dish.type === 'drink' && <BaseCard
                key={i} icon='how-to-reg' navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency} – Stock : ${dish.stock ?? 'non défini'}`}
              />)}
            </>}

            {(dishType === 'alcohol' || dishType === 'all') && <>
              <Text style={styles.title}>Boissons alcoolisées</Text>
              {dishes?.map((dish, i) => dish.type === 'alcohol' && <BaseCard
                key={i} icon='how-to-reg' navigation={navigation} screen='AdminEditDish' description={dish?.detail || 'Aucun détail'}
                params={{dish}} title={dish?.name} subtitle={`${dish?.price} ${dish?.currency} – Stock : ${dish.stock ?? 'non défini'}`}
              />)}
            </>}
          </View>
        </ScrollView>
        ) : (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Aucun plat n'a été ajouté.</Text>
          </View>
        )}
      <FAB style={styles.fab} icon='plus' color='white' onPress={() => navigation.navigate('AdminCreateDish')}/>
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  );
}
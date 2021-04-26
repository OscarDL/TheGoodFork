import { FAB } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView } from 'react-native';

import BaseCard from '../../../Reusables/BaseCard';
import { styles } from '../../../Reusables/Styles';
import { getDishes } from '../../../Functions/dishes';


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


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 30, marginBottom: 15}}>
          <View style={styles.pickerView}>
            <Picker
              style={{height: 40}}
              prompt="Que souhaites-tu afficher ?"
              selectedValue={dishType}
              onValueChange={type => setDishType(type)}
            >
              <Picker.Item label="    Entrées"   value="appetizer"/>
              <Picker.Item label="    Plats"     value="mainDish"/>
              <Picker.Item label="    Desserts"  value="dessert"/>
              <Picker.Item label="    Boissons"  value="drink"/>
              <Picker.Item label="    Alcools"   value="alcohol"/>
              <Picker.Item label="    Tout"      value="all"/>
            </Picker>
          </View>
        </View>

        {dishes?.length > 0 && <>
          <View style={{marginVertical: 5}}>
            
            {(dishType === 'appetizer' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Entrées</Text>
              {dishes?.map((dish, i) => dish.type === 'appetizer' && <BaseCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + ' ' + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}

            {(dishType === 'mainDish' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Plats</Text>
              {dishes?.map((dish, i) => dish.type === 'mainDish' && <BaseCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}

            {(dishType === 'dessert' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Desserts</Text>
              {dishes?.map((dish, i) => dish.type === 'dessert' && <BaseCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}

            {(dishType === 'drink' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Boissons</Text>
              {dishes?.map((dish, i) => dish.type === 'drink' && <BaseCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}

            {(dishType === 'alcohol' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Boissons alcoolisées</Text>
              {dishes?.map((dish, i) => dish.type === 'alcohol' && <BaseCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}
          </View>
        </>}
      </ScrollView>
      <FAB style={styles.fab} icon='plus' color='white' onPress={() => navigation.navigate('AdminCreateDish')}/>
    </SafeAreaView>
  );
}
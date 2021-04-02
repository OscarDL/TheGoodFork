import axios from 'axios';
import { FAB } from 'react-native-paper';
import { View, Text, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { getDishes } from '../../../Functions/dishes';
import StaffHomeCard from '../../../Reusables/StaffHomeCard';


const failureAlert = (error, navigation) => {
  Alert.alert(
    "Couldn't retrieve dishes",
    error,
    [
      {
        text: 'CANCEL',
        onPress: () => navigation.goBack()
      },
      {
        text: 'RETRY',
        onPress: () => getSpecialUsers(token)
      }
    ]
  );
}


export default function AdminDishes({navigation}) {

  const [dishes, setDishes] = useState(null);
  const [dishType, setDishType] = useState('all');
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  useEffect(() => {
    if (isFocused) getDishes().then(res => res.success ? setDishes(res.dishes) : failureAlert(res, navigation));
  }, [isFocused]);


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 30, marginBottom: 15}}>
          <View style={styles.pickerView}>
            <Picker
              style={{height: 38}}
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
          <View style={{marginTop: 10}}>
            
            {(dishType === 'appetizer' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Entrées</Text>
              {dishes?.map((dish, i) => dish.type === 'appetizer' && <StaffHomeCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + ' ' + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}

            {(dishType === 'mainDish' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Plats</Text>
              {dishes?.map((dish, i) => dish.type === 'mainDish' && <StaffHomeCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}

            {(dishType === 'dessert' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Desserts</Text>
              {dishes?.map((dish, i) => dish.type === 'dessert' && <StaffHomeCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}

            {(dishType === 'drink' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Boissons</Text>
              {dishes?.map((dish, i) => dish.type === 'drink' && <StaffHomeCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}

            {(dishType === 'alcohol' || dishType === 'all') && <>
              <Text style={{...styles.title, marginTop: 6}}>Boissons alcoolisées</Text>
              {dishes?.map((dish, i) => dish.type === 'alcohol' && <StaffHomeCard
                key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
                description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
              />)}
            </>}
          </View>
        </>}
      </ScrollView>
      <FAB style={styles.fab} icon='plus' color='white' onPress={() => navigation.navigate('AdminCreateDish')}/>
    </View>
  );
}
import axios from 'axios';
import { FAB } from 'react-native-paper';
import { View, Text, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../Reusables/Styles';
import StaffHomeCard from '../../Reusables/StaffHomeCard';


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
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()
  const [dishType, setDishType] = useState("all")

  useEffect(() => { isFocused && getDishes(); }, [isFocused]);


  const getDishes = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const {data} = await axios.get('https://the-good-fork.herokuapp.com/api/dishes', config);

      (data?.success && data?.dishes) ? setDishes(data.dishes) : failureAlert(data?.error, navigation);
      
    } catch (error) { failureAlert(error.response.data.error, navigation); }
  };


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
      <View style={{width: '50%', height: 50, padding: 1, borderWidth: 1, borderColor: '#bbb', borderRadius: 4, backgroundColor: 'white'}}>
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

        {dishes?.length > 0 && <>
          <View style={{marginTop: 10}}>
            {dishes?.map((dish, i) => (dishType !== "all") ? dish.type === dishType && <StaffHomeCard 
              key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
              description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
            />: <StaffHomeCard 
            key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
            description={dish?.detail || 'Aucun détail'} screen='AdminEditDish' params={dish} navigation={navigation}
          />)}
          </View>
        </>}
      </ScrollView>
      <FAB style={styles.fab} icon='plus' color='white' onPress={() => navigation.navigate('AdminCreateDish')}/>
    </View>
  );
}
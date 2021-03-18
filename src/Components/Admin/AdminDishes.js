import axios from 'axios';
import { View, Text, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button, Icon } from 'react-native-elements';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';
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

  const [{token}, _] = useDataLayerValue();
  const [dishes, setDishes] = useState(null);
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  useEffect(() => { if (isFocused && token) getDishes(token); }, [token, isFocused]);


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
        <Button title='Create' onPress={() => navigation.navigate('AdminCreateDish')}/>
        {dishes?.length > 0 && <>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Entrée</Text>
            {dishes?.map((dish, i) => dish.type == 'entree' && <StaffHomeCard
              key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
              description={dish?.detail} screen='AdminEditDish' params={dish} navigation={navigation}
            />)}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Plats</Text>
            {dishes?.map((dish, i) => dish.type == 'mainDish' && <StaffHomeCard
              key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
              description={dish?.detail} screen='AdminEditDish' params={dish} navigation={navigation}
            />)}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Desserts</Text>
            {dishes?.map((dish, i) => dish.type == 'dessert' && <StaffHomeCard
              key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
              description={dish?.detail} screen='AdminEditDish' params={dish} navigation={navigation}
            />)}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Boissons</Text>
            {dishes?.map((dish, i) => dish.type == 'drink' && <StaffHomeCard
              key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
              description={dish?.detail} screen='AdminEditDish' params={dish} navigation={navigation}
            />)}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Boissons Alcoolisées</Text>
            {dishes?.map((dish, i) => dish.type == 'alcohol' && <StaffHomeCard
              key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
              description={dish?.detail} screen='AdminEditDish' params={dish} navigation={navigation}
            />)}
          </View>
        </>}
      </ScrollView>
    </View>
  );
}
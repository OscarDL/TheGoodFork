import axios from 'axios';
import { FAB } from 'react-native-paper';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';
import StaffHomeCard from '../../Reusables/StaffHomeCard';


export default function WaiterOrderDishes({navigation, route}) {
  const {type} = route.params;
  const [dishes, setDishes] = useState(null);
  const [{currentOrder}, dispatch] = useDataLayerValue();

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

  useEffect(() => { getDishes(); }, []);


  const appendOrder = (name, type) => {
    const newOrder = currentOrder;
    newOrder[type].push({name, status: 'pending'});

    dispatch({
      type: 'SET_CURRENT_ORDER',
      currentOrder: newOrder
    });
  };


  return (
    <>
      <ScrollView>
        {dishes?.length > 0 && <>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Entrées</Text>
            {dishes?.map((dish, i) => dish.type === type && <StaffHomeCard // change to OrderCard with scoped action
              key={i} icon='how-to-reg' title={dish?.name} subtitle={dish?.price + dish?.currency}
              description={dish?.detail} screen='AdminEditDish' params={dish} navigation={navigation}
            />)}
          </View>
        </>}
        <View style={{alignItems: 'center'}}>
          <Button buttonStyle={[styles.button]} title='Done' onPress={() => navigation.goBack()}/>
        </View>
      </ScrollView>
      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('AdminCreateDish')}/>
    </>
  );
}
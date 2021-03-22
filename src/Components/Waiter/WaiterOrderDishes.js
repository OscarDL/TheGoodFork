import axios from 'axios';
import { FAB } from 'react-native-paper';
import { View, Text, Easing } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../Reusables/Styles';


export default function WaiterOrderDishes({navigation, route}) {
  const {type} = route.params;
  const [state, setState] = useState([]);
  const [dishes, setDishes] = useState(null);


  const getDishes = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const {data} = await axios.get('https://the-good-fork.herokuapp.com/api/dishes', config);

      let newDishes;
      (data?.success && data?.dishes) ? newDishes = data.dishes : failureAlert(data?.error, navigation);

      if (newDishes) newDishes.forEach((dish, i) => {
        dish.key = i;
      });
      setDishes(newDishes);
      
    } catch (error) { failureAlert(error.response.data.error, navigation); }
  };

  useEffect(() => { getDishes(); }, []);


  const addToOrder = (item, num) => {
    let index;
    let exists = false;
    state.map((dish, i) => {
      if(dish.name === item.name) {
        exists = true;
        return index = i;
      }
    });

    if (exists) {
      let newState = state;
      newState[index].quantity += num;
      setState(newState[index].quantity === 0 ? [] : newState);
    } else {
      setState(state.concat({name: item.name, status: 'pending', quantity: 1, price: item.price}));
    }
    console.log(state);
  };
  

  const renderItem = ({item}) => ( item?.type === type &&
    <View style={{flex: 1, justifyContent: 'center', borderRadius: 6, marginHorizontal: 5}}>
      <TouchableOpacity
        activeOpacity={0.5}
        underlayColor='#eee'
        style={{
          flex: 1,
          padding: 8,
          borderRadius: 6,
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: 'white'
        }}
      >
        <Icon name='how-to-reg' type='material'/>

        <View style={{flexShrink: 1}}>
          <TextTicker loop
            scrollSpeed={200}
            bounceSpeed={100}
            bounceDelay={1000}
            marqueeDelay={1000}
            easing={Easing.linear}
            bouncePadding={{left: 0, right: 0}}
            style={{...styles.roboto, fontSize: 15, fontWeight: '600', paddingVertical: 10}}
          >
            {item?.name}
          </TextTicker>

          <Text style={styles.roboto}>{item?.price + ' ' + item?.currency}</Text>
          <Text style={{...styles.roboto, textTransform: 'capitalize', marginTop: 10}}>{item?.details || 'No details'}</Text>
        </View>
      </TouchableOpacity>

      <View style={{flex: 1, justifyContent: 'space-evenly', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => addToOrder(item, -1)}><Text>-</Text></TouchableOpacity>
        <Text>0</Text>
        <TouchableOpacity onPress={() => addToOrder(item, 1)}><Text>+</Text></TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={{...styles.container, paddingHorizontal: 5, paddingVertical: 10, flex: 1}}>
      <FlatList data={dishes} renderItem={renderItem} numColumns={2}/>
      <FAB style={styles.fab} icon='check' color='white' onPress={() => navigation.navigate('WaiterSubmitOrder', {[type]: state})}/>
    </View>
  );
}

import axios from 'axios';
import { FAB } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import { View, Text, Easing, Alert } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../Reusables/Styles';


const failureAlert = (error, navigation) => {
  Alert.alert(
    "Couldn't retrieve orders",
    error,
    [
      {
        text: 'CANCEL',
        onPress: () => navigation.goBack()
      },
      {
        text: 'RETRY',
        onPress: () => getOrders(token)
      }
    ]
  );
}


// FIX ORDER BUG : APPETIZER -> MAIN DISH -> ALCOHOL -> DESSERT -> EDIT ALCOHOL --- DESSERT = NULL

export default function WaiterOrderDishes({navigation, route}) {
  const {type} = route.params;
  const [state, setState] = useState(route.params[type] || []);
  const [dishes, setDishes] = useState(null);
  const [refresh, setRefresh] = useState(false);


  const getDishes = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const {data} = await axios.get('https://the-good-fork.herokuapp.com/api/dishes', config);

      let tmpDishes, newDishes = [];
      (data?.success && data?.dishes) ? tmpDishes = data.dishes : failureAlert(data?.error, navigation);

      if (tmpDishes) tmpDishes.forEach((dish, i) => {
        dish.key = i;
      });
      tmpDishes.forEach(dish => dish.type === type && newDishes.push(dish));

      setDishes(newDishes);
      
    } catch (error) { failureAlert(error.response.data.error, navigation); }
  };

  useEffect(() => { getDishes(); }, []);


  const addToOrder = (item, num) => {
    let index;
    let exists = false;
    state.map((dish, i) => {
      if(dish._id === item._id) {
        exists = true;
        return index = i;
      }
    });
    
    if (exists || num === -1) {
      let newState = state;
      
      if (num === -1 && newState.find(s => s._id === item._id) === undefined) return;

      else if (num === -1 && newState[index].quantity === 1)
        newState.splice(index);

      else newState[index].quantity += num;

      setState(newState);

    } else setState(prevState => prevState.concat({_id: item._id, name: item.name, status: 'pending', quantity: 1, price: item.price}));

    setRefresh(ref => !ref);
  };

  const getNumber = (item) => state.find(dish => dish && dish._id === item._id)?.quantity || 0;

  const renderItem = ({item}) => (
    <View style={{flex: 1, justifyContent: 'center', borderRadius: 6, marginHorizontal: 5, alignItems: 'center', flexDirection: 'column', backgroundColor: 'white'}}>
      <Icon name='how-to-reg' type='material' style={{paddingTop: 8}}/>

      <View style={{flexShrink: 1, padding: 8}}>
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

      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#e3e3e3', borderBottomLeftRadius: 6, borderBottomRightRadius: 6}}>
        <TouchableOpacity style={{minWidth: '33%', borderBottomLeftRadius: 6, paddingVertical: 10}} onPress={() => addToOrder(item, -1)}>
          <Text style={{textAlign: 'center', fontSize: 20}}>-</Text>
        </TouchableOpacity>

        <Text style={{minWidth: '33%', textAlign: 'center', paddingVertical: 10, fontSize: 20}}>
          {refresh ? getNumber(item) : (
            route.params[type] !== null ? route.params[type].find(req => req._id === item._id)?.quantity || 0 : getNumber(item)
          ) /* Hacky way of refreshing the item number count */}
        </Text>

        <TouchableOpacity style={{minWidth: '33%', borderBottomRightRadius: 6, paddingVertical: 10}} onPress={() => addToOrder(item, 1)}>
          <Text style={{textAlign: 'center', fontSize: 20}}>+</Text>
        </TouchableOpacity>
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
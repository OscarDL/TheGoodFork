import axios from 'axios';
import { FAB } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import TextTicker from 'react-native-text-ticker';
import React, { useEffect, useState } from 'react';
import { View, Text, Easing, Alert } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { getDishes } from '../../../Functions/dishes';
import { formatGrid } from '../../../Functions/utils';
import { addToOrder } from '../../../Functions/orders';


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


export default function WaiterOrderDishes({navigation, route}) {
  const {type} = route.params;
  const [state, setState] = useState(route.params[type] || []);
  const [dishes, setDishes] = useState(null);
  const [refresh, setRefresh] = useState({
    value: false,
    count: 0
  });

  useEffect(() => {
    getDishes(type).then(res => res.success ? setDishes(res.dishes) : failureAlert(res, navigation));
  }, []);

  const addItem = (item, num) => {
    setState(prevState => addToOrder(prevState, item, num));
    setRefresh(ref => ({value: !ref.value, count: ref.count+1}));
  };

  const getNumber = (item) => state.find(dish => dish && dish._id === item._id)?.quantity || 0;

  const renderItem = ({item}) => (
    item.empty ? <View style={[styles.item, styles.itemInvisible]}/> :
    <View style={styles.item}>
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
        <TouchableOpacity style={{minWidth: '33%', borderBottomLeftRadius: 6, paddingVertical: 10}} onPress={() => addItem(item, -1)}>
          <Text style={{textAlign: 'center', fontSize: 20}}>-</Text>
        </TouchableOpacity>

        <Text style={{minWidth: '33%', textAlign: 'center', paddingVertical: 10, fontSize: 20}}>
          {refresh.value ? getNumber(item) : ( // Hacky way of refreshing the item number count
            refresh.count === 0 ? route.params[type]?.find(req => req._id === item._id)?.quantity || 0 : getNumber(item)
          )}
        </Text>

        <TouchableOpacity style={{minWidth: '33%', borderBottomRightRadius: 6, paddingVertical: 10}} onPress={() => addItem(item, 1)}>
          <Text style={{textAlign: 'center', fontSize: 20}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={{...styles.container, paddingHorizontal: 5, paddingVertical: 10, flex: 1}}>
      {dishes && <FlatList data={formatGrid(dishes, 2)} renderItem={renderItem} numColumns={2}/>}
      <FAB style={styles.fab} icon='check' color='white' onPress={() => navigation.navigate('WaiterSubmitOrder', {[type]: state.length > 0 ? state : null})}/>
    </View>
  );
}
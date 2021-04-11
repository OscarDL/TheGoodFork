import { Icon } from 'react-native-elements';
import TextTicker from 'react-native-text-ticker';
import React, { useEffect, useState } from 'react';
import { View, Text, Easing, Alert } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { getDishes } from '../../../Functions/dishes';
import { formatGrid } from '../../../Functions/utils';
import { addToOrder, totalPrice } from '../../../Functions/orders';


const failureAlert = (error, navigation, setFailed) => {
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
        onPress: () => setFailed(true)
      }
    ]
  );
}


export default function WaiterOrderDishes({navigation, type, order, setOrder, setPrice}) {
  const [dishes, setDishes] = useState(null);
  const [failed, setFailed] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (failed) {
      getDishes(type).then(res => {
        setFailed(false);
        res.success ? setDishes(res.dishes) : failureAlert(res, navigation, setFailed);
      });
    }
  }, [failed, setFailed]);

  const addItem = (item, num) => {
    setOrder(prevOrder => addToOrder(prevOrder, type, item, num, setPrice));
    setRefresh(ref => !ref);
  };

  const getNumber = (item) => order[type]?.find(dish => dish && dish._id === item._id)?.quantity || 0;

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
          {refresh ? getNumber(item) : getNumber(item) /* Hacky way of refreshing the item number count */}
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
    </View>
  );
}
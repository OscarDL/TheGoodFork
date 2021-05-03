import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import TextTicker from 'react-native-text-ticker';
import { View, Text, Easing } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../Styles';
import { addToOrder } from '../../Functions/orders';


export default function OrderItem({item, type, order, setOrder, setPrice, small}) {
  const [quantity, setQuantity] = useState(order[type]?.find(dish => dish && dish._id === item._id)?.quantity || 0);

  const addItem = (item, num) => {
    setOrder(addToOrder(order, type, item, num, setPrice));
    setQuantity(quantity => {
      if (quantity + num < 0) return 0;
      if (item.stock === null) return quantity + num;
      if (item.stock === 0 || quantity + num > item.stock) return quantity;
      return quantity + num;
    });
  };

  return (
    <View style={styles.item}>
      <View style={small ? {flexDirection: 'column'} : {flexDirection: 'row', alignItems: 'center'}}>
        <Icon name='how-to-reg' type='material' style={{paddingTop: 8}}/>

        <View style={{padding: 8, flexGrow: small ? 0 : 1}}>
          <TextTicker loop
            scrollSpeed={200}
            bounceSpeed={100}
            bounceDelay={1000}
            marqueeDelay={1000}
            easing={Easing.linear}
            bouncePadding={{left: 0, right: 0}}
            style={{fontSize: 15, fontWeight: '600', paddingVertical: 10}}
          >
            {item?.name}
          </TextTicker>
          <Text>{item?.price + ' ' + item?.currency}</Text>
          <TextTicker loop
            scrollSpeed={200}
            bounceSpeed={100}
            bounceDelay={1000}
            marqueeDelay={1000}
            easing={Easing.linear}
            bouncePadding={{left: 0, right: 0}}
            style={{paddingTop: 10}}
          >
            {item?.detail || 'Aucun détail'}
          </TextTicker>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#e3e3e3', borderBottomLeftRadius: 6, borderBottomRightRadius: 6}}>
        <TouchableOpacity style={{minWidth: '35%', borderBottomLeftRadius: 6, paddingVertical: 10}} onPress={() => addItem(item, -1)}>
          <Text style={{textAlign: 'center', fontSize: 20}}>-</Text>
        </TouchableOpacity>

        <Text style={{minWidth: '30%', textAlign: 'center', paddingVertical: 10, fontSize: 20}}>
          {item.stock === 0 ? 'OOS' : (!item.stock ? quantity : (item.stock === 0 ? 'OOS' : quantity + ' / ' + item.stock))}
        </Text>

        <TouchableOpacity style={{minWidth: '35%', borderBottomRightRadius: 6, paddingVertical: 10}} onPress={() => addItem(item, 1)}>
          <Text style={{textAlign: 'center', fontSize: 20}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

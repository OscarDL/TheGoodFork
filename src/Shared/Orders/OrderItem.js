import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import TextTicker from 'react-native-text-ticker';
import { View, Text, Easing } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from '../colors';
import { styles } from '../styles';
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

      {item.stock !== 0 ? (
        <View style={styles.orderItemRow}>
          <TouchableOpacity style={{minWidth: '30%', borderBottomLeftRadius: 6}} onPress={() => addItem(item, -1)}>
            <Icon name='remove' color={colors.accentPrimary} style={{width: '100%'}}/>
          </TouchableOpacity>

          <Text style={{minWidth: '40%', textAlign: 'center', fontSize: 20}}>
            {item.stock === 0 ? 'Rupture' : (!item.stock ? quantity : quantity + ' / ' + item.stock)}
          </Text>

          <TouchableOpacity style={{minWidth: '30%', borderBottomRightRadius: 6}} onPress={() => addItem(item, 1)}>
            <Icon name='add' color={colors.accentPrimary} style={{width: '100%'}}/>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.orderItemRow}>
          <Text style={{minWidth: '100%', textAlign: 'center', fontSize: 20}}>Rupture</Text>
        </View>
      )}
    </View>
  );
}

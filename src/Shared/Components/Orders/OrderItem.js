import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from '../../colors';
import { styles } from '../../styles';
import { addToOrder } from '../../../Functions/orders';


export default function OrderItem({item, type, oldOrder, order, setOrder, setPrice, small}) {
  // initialQuantity is necessary to get static existing quantities when editing order
  const initialQuantity = oldOrder?.[type]?.find(dish => dish && dish._id === item._id)?.quantity ?? 0;
  const [quantity, setQuantity] = useState(order[type]?.find(dish => dish && dish._id === item._id)?.quantity ?? 0);

  const addItem = (item, num) => {
    setQuantity(quantity => quantity + num);
    setOrder(addToOrder(order, type, item, num, setPrice));
  };
  

  return (
    <View style={styles.item}>
      <View style={{flexDirection: small ? 'column' : 'row'}}>
        <Image
          source={{uri: item.image}}
          style={{
            marginVertical: 16, marginLeft: small ? 0 : 8, alignSelf: 'center',
            width: 100, height: (item.type === 'drink' || item.type === 'alcohol') ? 75 : 50
          }}
        />

        <View style={{padding: 8, flexShrink: small ? 0 : 1, alignSelf: 'center'}}>
          <Text
            numberOfLines={small ? 2 : 1}
            style={{
              fontSize: 16,
              minWidth: '100%',
              fontWeight: '700',
              textAlign: small ? 'center' : 'left'
            }}
          >
            {item?.name}
          </Text>
          <Text style={{paddingTop: 20}}>{item?.detail || 'Aucun détail'}</Text>
          <Text>{item?.price + ' ' + item?.currency}</Text>
        </View>
      </View>

      {item.stock !== 0 ? (
        <View style={styles.orderItemRow}>
          <TouchableOpacity
            disabled={!quantity}
            onPress={() => addItem(item, -1)}
            style={{minWidth: '30%', borderBottomLeftRadius: 6}}
          >
            <Icon name='remove' color={colors.accentPrimary} style={styles.orderItemButton}/>
          </TouchableOpacity>

          <Text style={{minWidth: '40%', textAlign: 'center', fontSize: 20}}>
            {item.stock === 0 ? 'Rupture' : (!item.stock ? quantity : quantity + ' / ' + (item.stock + initialQuantity))}
          </Text>

          <TouchableOpacity
            onPress={() => addItem(item, 1)}
            style={{minWidth: '30%', borderBottomRightRadius: 6}}
            disabled={item.stock !== null && quantity >= item.stock}
          >
            <Icon name='add' color={colors.accentPrimary} style={styles.orderItemButton}/>
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

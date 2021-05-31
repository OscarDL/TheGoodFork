import React from 'react';
import { View, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import OrderItem from './OrderItem';
import { styles } from '../../styles';
import { formatGrid } from '../../../Functions/utils';


const cols = Dimensions.get('window').width > 375 ? 2 : 1;


export default function OrderDishes({type, dishes, oldOrder, order, setOrder, setPrice}) {
  const renderItem = ({item}) => (
    item.empty && cols > 1
      ?
    <View style={[styles.item, styles.itemInvisible] /* Show an invisible item for impair dishes number */}/>
      :
    <OrderItem
      item={item}
      type={type}
      order={order}
      oldOrder={oldOrder}
      setOrder={setOrder}
      setPrice={setPrice}
      small={cols > 1 ? true : false}
    />
  );


  return (
    <View style={{...styles.container, flex: 1}}>
      {dishes && <FlatList
        numColumns={cols}
        renderItem={renderItem}
        data={formatGrid(dishes, cols)}
        keyExtractor={item => item._id}
        contentContainerStyle={{padding: 5}}
      />}
    </View>
  );
}
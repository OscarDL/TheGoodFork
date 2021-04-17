import { View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { styles } from '../Styles';
import OrderItem from './OrderItem';
import { getDishes } from '../../Functions/dishes';
import { formatGrid } from '../../Functions/utils';


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


export default function OrderDishes({navigation, type, order, setOrder, setPrice}) {
  const [dishes, setDishes] = useState(null);
  const [failed, setFailed] = useState(true);
  //const [sort, setSort] = useState({by: 'name', in: 'asc'});

  useEffect(() => {
    if (failed) {
      getDishes(type).then(res => {
        setFailed(false);
        res.success ? setDishes(res.dishes) : failureAlert(res, navigation, setFailed);
      });
    }
  }, [failed, setFailed]);

  const renderItem = ({item}) => (
    item.empty
      ?
    <View style={[styles.item, styles.itemInvisible] /* Show an invisible item for impair dishes number */}/>
      :
    <OrderItem item={item} type={type} order={order} setOrder={setOrder} setPrice={setPrice} />
  );


  return (
    <View style={{...styles.container, flex: 1}}>
      {dishes && <FlatList contentContainerStyle={{padding: 5}} data={formatGrid(dishes, 2)} renderItem={renderItem} numColumns={2}/>}
    </View>
  );
}
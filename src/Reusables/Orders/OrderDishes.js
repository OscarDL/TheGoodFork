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

  useEffect(() => {
    if (failed) {
      getDishes(type).then(res => {
        setFailed(false);
        res.success ? setDishes(res.dishes) : failureAlert(res, navigation, setFailed);
      });
    }
  }, [failed, setFailed]);

  /*const addItem = (item, num) => {
    setOrder(prevOrder => addToOrder(prevOrder, type, item, num, setPrice));
    setRefresh(ref => !ref);
  };*/

  //const getNumber = (item) => order[type]?.find(dish => dish && dish._id === item._id)?.quantity || 0;

  const renderItem = ({item}) => (
    item.empty
      ?
    <View style={[styles.item, styles.itemInvisible]}/>
      :
    <OrderItem item={item} type={type} order={order} setOrder={setOrder} setPrice={setPrice} />
  );


  return (
    <View style={{...styles.container, flex: 1}}>
      {dishes && <FlatList contentContainerStyle={{padding: 5}} data={formatGrid(dishes, 2)} renderItem={renderItem} numColumns={2}/>}
    </View>
  );
}
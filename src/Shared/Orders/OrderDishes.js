import React, { useEffect, useState } from 'react';
import { View, Alert, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { styles } from '../styles';
import OrderItem from './OrderItem';
import { getDishes } from '../../Functions/dishes';
import { formatGrid } from '../../Functions/utils';


const failureAlert = (error, navigation, setRetry) => Alert.alert(
  "Erreur d'affichage des plats", error,
  [{
    text: 'Annuler',
    onPress: () => navigation.goBack()
  },
  {
    text: 'Réessayer',
    onPress: () => setRetry(true)
  }]
);

const cols = Dimensions.get('window').width > 375 ? 2 : 1;


export default function OrderDishes({navigation, type, order, setOrder, setPrice}) {
  const [dishes, setDishes] = useState(null);
  const [retry, setRetry] = useState(true);

  useEffect(() => {
    if (retry) {
      getDishes(type).then(res => {
        setRetry(false);
        res.success ? setDishes(res.dishes) : failureAlert(res, navigation, setRetry);
      });
    }
  }, [retry, setRetry]);

  const renderItem = ({item}) => (
    item.empty
      ?
    <View style={[styles.item, styles.itemInvisible] /* Show an invisible item for impair dishes number */}/>
      :
    <OrderItem
      item={item}
      type={type}
      order={order}
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
        contentContainerStyle={{padding: 5}}
      />}
    </View>
  );
}
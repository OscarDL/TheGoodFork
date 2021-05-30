import React from 'react';
import { View, Text } from 'react-native';

import { styles } from '../styles';
import { truncPrice } from '../../Functions/utils';


export default OrderDetails = ({order, hideDetails = false, showPrice = true}) => (
  <View>
    {order.appetizer.length > 0 && <View>
      <Text style={styles.title}>Apéritifs</Text>

      <View style={styles.card}>
        {order.appetizer?.map((it, i) =>
          <View key={i} style={{...styles.orderDetailsView, paddingTop: i > 0 ? 8 : 0}}>
            <Text numberOfLines={1} style={styles.orderDetailsRow}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
            <Text style={{fontWeight: '500'}}>{Number((it.price * it.quantity).toFixed(2))}</Text>
          </View>
        )}
      </View>
    </View>}

    {order.mainDish.length > 0 && <View>
      <Text style={styles.title}>Plats principaux</Text>

      <View style={styles.card}>
        {order.mainDish?.map((it, i) =>
          <View key={i} style={{...styles.orderDetailsView, paddingTop: i > 0 ? 8 : 0}}>
            <Text numberOfLines={1} style={styles.orderDetailsRow}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
            <Text style={{fontWeight: '500'}}>{Number((it.price * it.quantity).toFixed(2))}</Text>
          </View>
        )}
      </View>
    </View>}

    {order.dessert.length > 0 && <View>
      <Text style={styles.title}>Desserts</Text>

      <View style={styles.card}>
        {order.dessert?.map((it, i) =>
          <View key={i} style={{...styles.orderDetailsView, paddingTop: i > 0 ? 8 : 0}}>
            <Text numberOfLines={1} style={styles.orderDetailsRow}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
            <Text style={{fontWeight: '500'}}>{Number((it.price * it.quantity).toFixed(2))}</Text>
          </View>
        )}
      </View>
    </View>}

    {order.drink.length > 0 && <View>
      <Text style={styles.title}>Boissons</Text>

      <View style={styles.card}>
        {order.drink?.map((it, i) =>
          <View key={i} style={{...styles.orderDetailsView, paddingTop: i > 0 ? 8 : 0}}>
            <Text numberOfLines={1} style={styles.orderDetailsRow}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
            <Text style={{fontWeight: '500'}}>{Number((it.price * it.quantity).toFixed(2))}</Text>
          </View>
        )}
      </View>
    </View>}

    {order.alcohol.length > 0 && <View>
      <Text style={styles.title}>Boissons alcoolisées</Text>

      <View style={styles.card}>
        {order.alcohol?.map((it, i) =>
          <View key={i} style={{...styles.orderDetailsView, paddingTop: i > 0 ? 8 : 0}}>
            <Text numberOfLines={1} style={styles.orderDetailsRow}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
            <Text style={{fontWeight: '500'}}>{Number((it.price * it.quantity).toFixed(2))}</Text>
          </View>
        )}
      </View>
    </View>}

    {(!hideDetails && order.details) && <View>
      <Text numberOfLines={1} style={styles.title}>Détails supplémentaires</Text>

      <View style={styles.card}>
        <Text style={{fontWeight: '400'}}>{order.details}</Text>
      </View>
    </View>}
    
    {showPrice && <>
      <Text style={{...styles.title, textAlign: 'center', marginTop: 30}}>
        Total : {truncPrice(order.price + order.tip)} EUR
      </Text>
      {order.tip ? <Text style={{fontSize: 16, alignSelf: 'center', marginBottom: 10}}>
        Pourboire inclus : {order.tip.toFixed(2)} EUR
      </Text> : null}
    </>}
  </View>
)
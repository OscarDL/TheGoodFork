import React from 'react';
import { View, Text } from 'react-native';

import { styles } from '../Styles';


export default function OrderDetails({order}) {
  return (
    <View>
      {order.appetizer.length > 0 && <>
        <View style={{marginTop: 6}}>
          <Text style={styles.title}>Apéritifs</Text>

          <View style={styles.card}>
            {order.appetizer?.map((it, i) =>
              <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
              </View>
            )}
          </View>
        </View>
      </>}

      {order.mainDish.length > 0 && <>
        <View>
          <Text style={styles.title}>Plats principaux</Text>

          <View style={styles.card}>
            {order.mainDish?.map((it, i) =>
              <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
              </View>
            )}
          </View>
        </View>
      </>}

      {order.dessert.length > 0 && <>
        <View>
          <Text style={styles.title}>Desserts</Text>

          <View style={styles.card}>
            {order.dessert?.map((it, i) =>
              <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
              </View>
            )}
          </View>
        </View>
      </>}

      {order.drink.length > 0 && <>
        <View>
          <Text style={styles.title}>Boissons</Text>

          <View style={styles.card}>
            {order.drink?.map((it, i) =>
              <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
              </View>
            )}
          </View>
        </View>
      </>}

      {order.alcohol.length > 0 && <>
        <View>
          <Text style={styles.title}>Boissons alcoolisées</Text>

          <View style={styles.card}>
            {order.alcohol?.map((it, i) =>
              <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
              </View>
            )}
          </View>
        </View>
      </>}
    </View>
  )
}
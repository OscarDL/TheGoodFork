import axios from 'axios';
import React from 'react';
import { FAB } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';
import { deleteOrder, validateOrder } from '../../../Functions/orders';


const handleValidate = (order, token, navigation) => {
  validateOrder(order, token).then(res => Alert.alert(
    res.success ? res.title : "Could not validate order",
    res.success ? res.desc : res,
    [{
      text: res.success ? "DONE" : "RETRY",
      onPress: () => res.success ? navigation.goBack() : null
    }]
  ));
}

const handleDelete = (order, token, navigation) => {
  Alert.alert(
    "Are you sure?",
    `You're about to delete this order.`,
    [
      { text: 'CANCEL' },
      { text: 'CONTINUE',
        onPress: () => deleteOrder(order, token).then(res => Alert.alert(
          res.success ? res.title : "Could not delete order",
          res.success ? res.desc : res,
          [{
            text: res.success ? "DONE" : "RETRY",
            onPress: () => res.success ? navigation.goBack() : null
          }]
        ))
      }
    ]
  );
}


export default function WaiterOrderDetails({navigation, route}) {
  const {order, readOnly} = route.params.params;
  const [{token}, _] = useDataLayerValue();
  
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        {order.appetizer && <>
          <View style={{marginTop: 6}}>
            <Text style={styles.title}>Apéritifs</Text>

            <View style={{backgroundColor: 'white', borderRadius: 6, marginHorizontal: 10, marginVertical: 5, padding: 10}}>
              {order.appetizer?.map((it, i) =>
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                  <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                  <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
                </View>
              )}
            </View>
          </View>
        </>}

        {order.mainDish && <>
          <View>
            <Text style={styles.title}>Plats principaux</Text>

            <View style={{backgroundColor: 'white', borderRadius: 6, marginHorizontal: 10, marginVertical: 5, padding: 10}}>
              {order.mainDish?.map((it, i) =>
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                  <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                  <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
                </View>
              )}
            </View>
          </View>
        </>}

        {order.dessert && <>
          <View>
            <Text style={styles.title}>Desserts</Text>

            <View style={{backgroundColor: 'white', borderRadius: 6, marginHorizontal: 10, marginVertical: 5, padding: 10}}>
              {order.dessert?.map((it, i) =>
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                  <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                  <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
                </View>
              )}
            </View>
          </View>
        </>}

        {order.drink && <>
          <View>
            <Text style={styles.title}>Boissons</Text>

            <View style={{backgroundColor: 'white', borderRadius: 6, marginHorizontal: 10, marginVertical: 5, padding: 10}}>
              {order.drink?.map((it, i) =>
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                  <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                  <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
                </View>
              )}
            </View>
          </View>
        </>}

        {order.alcohol && <>
          <View>
            <Text style={styles.title}>Boissons alcoolisées</Text>

            <View style={{backgroundColor: 'white', borderRadius: 6, marginHorizontal: 10, marginVertical: 5, padding: 10}}>
              {order.alcohol?.map((it, i) =>
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: i > 0 ? 6 : 0}}>
                  <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                  <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
                </View>
              )}
            </View>
          </View>
        </>}

        <Text style={{...styles.title, textAlign: 'center', marginVertical: 10}}>Total: {order.price} {order.currency}</Text>

        <View style={{alignItems: 'center', margin: 10, marginBottom: 20}}>
          {readOnly
            ?
            <Text style={{...styles.roboto, fontSize: 16, textTransform: 'capitalize'}}>status: {order.status}</Text>
            :
          <TouchableOpacity style={{padding: 10}} onPress={() => handleDelete(order, token, navigation)}>
            <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Delete this order</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
      {!readOnly && <FAB style={styles.fab} icon='check' color='white' onPress={() => handleValidate(order, token, navigation)}/>}
    </View>
  );
}
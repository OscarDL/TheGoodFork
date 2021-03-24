import axios from 'axios';
import React from 'react';
import { FAB } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { useDataLayerValue } from '../../Context/DataLayer';


const validateOrder = async (order, token, navigation) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    order.validated = true;
    const {data} = await axios.put('https://the-good-fork.herokuapp.com/api/orders/edit/' + order._id, order, config);

    if (!data.success) return Alert.alert(
      "Impossible de valider la commande.",
      "Erreur: " + data?.error,
      [
        { text: 'CANCEL' },
        {
          text: 'RETRY',
          onPress: () => validateOrder(order, token, navigation)
        }
      ]
    );

    Alert.alert(
      "Succès",
      "La commande a bien été validée.",
      [{text: 'TERMINÉ', onPress: () => navigation.goBack()}]
    );
    
  } catch (error) { 
    Alert.alert(
      "Impossible de valider la commande.",
      "Erreur: " + error.response?.data.error,
      [
        { text: 'CANCEL' },
        {
          text: 'RETRY',
          onPress: () => validateOrder(order, token, navigation)
        }
      ]
    );
   }
}

const deleteOrder = async (order, token, navigation) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const {data} = await axios.delete('http://10.0.0.2:9000/api/orders/delete/' + order._id, config);

    if (!data.success) return Alert.alert(
      "Impossible de valider la commande.",
      "Erreur: " + data?.error,
      [
        { text: 'CANCEL' },
        {
          text: 'RETRY',
          onPress: () => deleteOrder(order, token, navigation)
        }
      ]
    );

    Alert.alert(
      "Succès",
      "Cette commande a été supprimée avec succès.",
      [{text: 'TERMINÉ', onPress: () => navigation.goBack()}]
    );
    
  } catch (error) {
    Alert.alert(
      "Impossible de supprimer la commande.",
      "Erreur: " + error.response?.data.error,
      [
        { text: 'CANCEL' },
        {
          text: 'RETRY',
          onPress: () => deleteOrder(order, token, navigation)
        }
      ]
    );
  }
}


export default function WaiterOrderDetails({navigation, route}) {
  const order = route.params.params;
  const [{token}, _] = useDataLayerValue();
  
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        {order.appetizer && <>
          <View style={{marginTop: 10}}>
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
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Plats principaux</Text>

            <View style={{backgroundColor: 'white', borderRadius: 6, marginHorizontal: 10, marginVertical: 5, padding: 10}}>
              {order.mainDish?.map((it, i) =>
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                  <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
                </View>
              )}
            </View>
          </View>
        </>}

        {order.dessert && <>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Desserts</Text>

            <View style={{backgroundColor: 'white', borderRadius: 6, marginHorizontal: 10, marginVertical: 5, padding: 10}}>
              {order.dessert?.map((it, i) =>
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                  <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
                </View>
              )}
            </View>
          </View>
        </>}

        {order.drink && <>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Boissons</Text>

            <View style={{backgroundColor: 'white', borderRadius: 6, marginHorizontal: 10, marginVertical: 5, padding: 10}}>
              {order.drink?.map((it, i) =>
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                  <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
                </View>
              )}
            </View>
          </View>
        </>}

        {order.alcohol && <>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Boissons alcoolisées</Text>

            <View style={{backgroundColor: 'white', borderRadius: 6, marginHorizontal: 10, marginVertical: 5, padding: 10}}>
              {order.alcohol?.map((it, i) =>
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{maxWidth: '75%'}}><Text style={{fontWeight: '700'}}>{it.quantity}x </Text> {it.name}</Text>
                  <Text style={{maxWidth: '20%'}}>{Number((it.price * it.quantity).toFixed(2))} {order.currency}</Text>
                </View>
              )}
            </View>
          </View>
        </>}

        <Text style={{...styles.title, textAlign: 'center', marginVertical: 10}}>Total: {order.price} {order.currency}</Text>

        <View style={{alignItems: 'center', margin: 10, marginBottom: 20}}>
          <TouchableOpacity style={{padding: 10}} onPress={() => deleteOrder(order, token, navigation)}>
            <Text style={{...styles.roboto, color: '#f22', fontSize: 16}}>Delete this order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FAB style={styles.fab} icon='check' color='white' onPress={() => validateOrder(order, token, navigation)}/>
    </View>
  );
}
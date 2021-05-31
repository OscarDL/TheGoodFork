import React from 'react';
import { View, ScrollView } from 'react-native';

import { styles } from '../../Shared/styles';
import TouchCard from '../../Shared/Components/TouchCard';


export default function WaiterHome({navigation}) {
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <View style={{marginVertical: 5}}>
          <TouchCard icon='book-online' title='Tables disponibles' description='Modifier les réservations et disponibilités.' screen='WaiterPlanning' navigation={navigation}/>
          <TouchCard icon='assignment-turned-in' title='Valider une commande' description='Valider ou supprimer une commande client.' screen='WaiterValidateOrder' navigation={navigation} />
          <TouchCard icon='app-registration' title='Nouvelle commande' description='Passer commande pour client non-enregistré.' screen='WaiterNewOrder' navigation={navigation} />
          <TouchCard icon='alarm' title='Commandes en cours' description='Consulter le statut des commandes en cours.' screen='WaiterCheckOrders' navigation={navigation} />
          <TouchCard icon='credit-card' title='Addition client' description="Faire l'addition pour un client sur place." screen='WaiterCreateBill' navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
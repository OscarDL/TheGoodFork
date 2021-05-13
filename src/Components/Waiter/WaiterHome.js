import React from 'react';
import { View, ScrollView } from 'react-native';

import BaseCard from '../../Shared/BaseCard';
import { styles } from '../../Shared/styles';


export default function WaiterHome({navigation}) {
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <View style={{marginVertical: 5}}>
          <BaseCard icon='book-online' title='Tables disponibles' description='Modifier les réservations et disponibilités.' screen='WaiterManageTables' navigation={navigation}/>
          <BaseCard icon='assignment-turned-in' title='Valider une commande' description='Valider ou supprimer une commande client.' screen='WaiterValidateOrder' navigation={navigation} />
          <BaseCard icon='app-registration' title='Effectuer une commande' description='Passer commande pour un client non-enregistré.' screen='WaiterNewOrder' navigation={navigation} />
          <BaseCard icon='alarm' title='Commandes en cours' description='Consulter le statut des commandes en cours.' screen='WaiterCheckOrders' navigation={navigation} />
          <BaseCard icon='credit-card' title='Addition client' description="Faire l'addition pour un client sur place." screen='WaiterCreateBill' navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
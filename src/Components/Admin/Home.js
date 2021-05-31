import React from 'react';
import { View, ScrollView } from 'react-native';

import { styles } from '../../Shared/styles';
import TouchCard from '../../Shared/Components/TouchCard';


export default function AdminHome({navigation}) {
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <View style={{marginVertical: 5}}>
          <TouchCard icon='assignment-ind' title='Comptes staffs' description='Création, modification et suppression de staff.' screen='AdminStaffList' navigation={navigation}/>
          <TouchCard icon='event-available' title='Tables disponibles' description='Modifier les réservations et disponibilités.' screen='AdminTables' navigation={navigation} />
          <TouchCard icon='menu-book' title='Menu et plats' description='Création, modification et suppression des plats.' screen='AdminDishList' navigation={navigation} />
          <TouchCard icon='euro' title='Revenu quotidien' description='Consulter les statistiques du revenu quotidien.' screen='AdminDailyRevenue' navigation={navigation} />
          <TouchCard icon='local-mall' title='Détails des ventes' description='Consulter les statistiques de vente avancées.' screen='AdminSalesStats' navigation={navigation} />
          <TouchCard icon='insights' title='Stocks disponibles' description='Vérifier la disponibilité du stock des plats.' screen='AdminStocksStats' navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
import React from 'react';
import { View, ScrollView } from 'react-native';

import BaseCard from '../../Shared/BaseCard';
import { styles } from '../../Shared/styles';


export default function AdminHome({navigation}) {
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <View style={{marginVertical: 5}}>
          <BaseCard icon='assignment-ind' title='Comptes staffs' description='Création, modification et suppression de staff.' screen='AdminStaffList' navigation={navigation}/>
          <BaseCard icon='event-available' title='Tables disponibles' description='Modifier les réservations et disponibilités.' screen='AdminTablesList' navigation={navigation} />
          <BaseCard icon='menu-book' title='Menu et plats' description='Création, modification et suppression des plats.' screen='AdminDishes' navigation={navigation} />
          <BaseCard icon='coins' type='font-awesome-5' title='Revenu quotidien' description='Consulter les statistiques du revenu quotidien.' screen='AdminDailyRevenue' navigation={navigation} />
          <BaseCard icon='tags' size={22} type='font-awesome-5' title='Détails des ventes' description='Consulter les statistiques de vente avancées.' screen='AdminSalesStats' navigation={navigation} />
          <BaseCard icon='insights' title='Stocks disponibles' description='Vérifier la disponibilité du stock des plats.' screen='AdminStocksStats' navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
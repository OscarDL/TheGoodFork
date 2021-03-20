import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { styles } from '../../Reusables/Styles';
import StaffHomeCard from '../../Reusables/StaffHomeCard';


export default function AdminHome({navigation}) {
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <View style={{marginVertical: 5}}>
          <StaffHomeCard icon='assignment-ind' title='Manage staff member accounts' description='Description 1' screen='AdminRegisterStaff' navigation={navigation}/>
          <StaffHomeCard icon='event-available' title='Edit table capacity & availability' description='Description 2' screen='AdminTablesList' navigation={navigation} />
          <StaffHomeCard icon='menu-book' title='Edit the dishes list for customers' description='Description 3' screen='AdminDishes' navigation={navigation} />
          <StaffHomeCard icon='coins' type='font-awesome-5' title='Check daily revenue of each service' description='Description 4' screen='AdminDailyRevenue' navigation={navigation} />
          <StaffHomeCard icon='tags' size={22} type='font-awesome-5' title='Check food & drinks sales statistics' description='Description 5' screen='AdminSalesStats' navigation={navigation} />
          <StaffHomeCard icon='insights' title='Check food & drinks stocks statistics' description='Description 6' screen='AdminStocksStats' navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
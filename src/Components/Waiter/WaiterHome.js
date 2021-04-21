import React from 'react';
import { View, ScrollView } from 'react-native';

import { styles } from '../../Reusables/Styles';
import StaffHomeCard from '../../Reusables/StaffHomeCard';


export default function WaiterHome({navigation}) {
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <View style={{marginVertical: 5}}>
          <StaffHomeCard icon='book-online' title='Manage table reservations' description='Description 1' screen='WaiterManageTables' navigation={navigation}/>
          <StaffHomeCard icon='assignment-turned-in' title='Validate customer orders' description='Description 2' screen='WaiterValidateOrder' navigation={navigation} />
          <StaffHomeCard icon='app-registration' title='Submit an order manually' description='Description 3' screen='WaiterNewOrder' navigation={navigation} />
          <StaffHomeCard icon='alarm' title='Ongoing orders' description='Check the status of orders you placed.' screen='WaiterCheckOrders' navigation={navigation} />
          <StaffHomeCard icon='credit-card' title='Create a table bill' description='Description 5' screen='WaiterCreateBill' navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
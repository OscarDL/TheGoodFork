import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../Styles';


function AdminCard({icon, size = 28, type = 'material', title, description, screen, navigation}) {
  return (
    <View style={{marginHorizontal: 10, marginVertical: 5}}>
      <TouchableOpacity
        activeOpacity={0.5}
        underlayColor='#eee'
        onPress={() => navigation.navigate(screen)}
        style={{
          flex: 1,
          padding: 8,
          borderRadius: 4,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >

        <Icon
          size={size}
          name={icon}
          type={type}
          color='#111'
          style={{marginHorizontal: 8}}
        />

        <View style={{flexShrink: 1, marginLeft: 8}}>
          <Text numberOfLines={1} style={styles.roboto}>{title}</Text>
          <Text style={styles.roboto}>{description}</Text>
        </View>

      </TouchableOpacity>
    </View>
  );
}

export default function AdminHome({navigation}) {
  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <View style={{marginVertical: 5}}>
          <AdminCard icon='assignment-ind' title='Register a new staff member' description='Description 1' screen='AdminRegisterStaff' navigation={navigation}/>
          <AdminCard icon='event-available' title='Edit table capacity & availability' description='Description 2' screen='AdminTablesList' navigation={navigation} />
          <AdminCard icon='menu-book' title='Edit the dishes list for customers' description='Description 3' screen='AdminDishes' navigation={navigation} />
          <AdminCard icon='coins' type='font-awesome-5' title='Check daily revenue of each service' description='Description 4' screen='AdminDailyRevenue' navigation={navigation} />
          <AdminCard icon='tags' size={26} type='font-awesome' title='Check food & drinks sales statistics' description='Description 5' screen='AdminSalesStats' navigation={navigation} />
          <AdminCard icon='insights' title='Check food & drinks stocks statistics' description='Description 6' screen='AdminStocksStats' navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
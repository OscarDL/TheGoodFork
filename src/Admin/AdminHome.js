import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../Styles';
import { useDataLayerValue } from '../Context/DataLayer';


function AdminCard({title, screen, navigation}) {
  return (
    <TouchableOpacity activeOpacity={0.5} underlayColor='#eee' onPress={() => navigation.navigate(screen)}>
      <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <Icon size={28} color='#111' type='material' name='account-circle' style={{marginHorizontal: 6, flex: 1, alignItems: 'center', justifyContent: 'center'}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontFamily: 'Roboto'}}>{title}</Text>
          <Text style={{fontFamily: 'Roboto'}}>Description</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function AdminHome({navigation}) {

  const [{user}, dispatch] = useDataLayerValue();

  const logout = async () => {
    await AsyncStorage.setItem('authToken', '');
    dispatch({type: 'SET_USER', user: null});
    dispatch({type: 'SET_TOKEN', token: ''});
  }

  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      {/*<Text style={{fontFamily: 'Roboto'}}>Welcome, {user?.type} {user?.firstName}!</Text>
      <Button title='Log out' buttonStyle={[styles.button]} onPress={logout} />*/}
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, rowGap: 10}}>
          <AdminCard title='Register a new staff member' screen='AdminRegisterStaff' navigation={navigation}/>
          <AdminCard title='Edit table capacity & availability' screen='AdminTablesList' navigation={navigation} />
          <AdminCard title='Edit the dishes list' screen='AdminDishes' navigation={navigation} />
          <AdminCard title='Check daily revenue of each service' screen='AdminDailyRevenue' navigation={navigation} />
          <AdminCard title='Check food & drinks sales statistics' screen='AdminSalesStats' navigation={navigation} />
          <AdminCard title='Check food & drinks stocks statistics' screen='AdminStocksStats' navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
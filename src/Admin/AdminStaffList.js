import axios from 'axios';
import { Icon } from 'react-native-elements';
import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from '../Styles';
import { useDataLayerValue } from '../Context/DataLayer';


const failureAlert = (error, navigation) => {
  Alert.alert(
    "Couldn't retrieve staff members",
    error,
    [
      {
        text: 'CANCEL',
        onPress: () => navigation.goBack()
      },
      {
        text: 'RETRY',
        onPress: () => getSpecialUsers(token)
      }
    ]
  );
} 


const SpecialUser = ({staff, navigation}) => (
  <View style={{marginHorizontal: 10, marginVertical: 5}}>
    <TouchableOpacity
      activeOpacity={0.5}
      underlayColor='#eee'
      onPress={() => navigation.navigate('AdminEditStaff', {staff})}
      style={{
        flex: 1,
        padding: 8,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
      }}
    >
      <Icon size={28} type='material' name='how-to-reg' style={{marginHorizontal: 8}}/>

      <View style={{flexShrink: 1, marginLeft: 8}}>

        <Text numberOfLines={1} style={{...styles.roboto, fontSize: 18, fontWeight: '700'}}>
          {staff?.firstName} {staff?.lastName}
        </Text>
        <Text style={styles.roboto}>{staff?.email}</Text>
        <Text style={{...styles.roboto, textTransform: 'capitalize', marginTop: 10}}>
          {staff?.type}
        </Text>

      </View>
    </TouchableOpacity>
  </View>
);


export default function AdminStaffList({navigation}) {

  const [staffs, setStaffs] = useState(null);
  const [{token}, _] = useDataLayerValue();
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  useEffect(() => { if (isFocused && token) getSpecialUsers(token); }, [token, isFocused]);


  const getSpecialUsers = async (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    try {
      const {data} = await axios.get('https://the-good-fork.herokuapp.com/api/admin/accounts/staff', config);

      (data?.success && data?.users) ? setStaffs(data.users) : failureAlert(data?.error, navigation);
      
    } catch (error) { failureAlert(error.response.data.error, navigation); }
  };


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        <View style={{marginVertical: 5}}>
          {staffs?.map((staff, i) => <SpecialUser key={i} staff={staff} navigation={navigation}/>)}
        </View>
      </ScrollView>
    </View>
  );
}
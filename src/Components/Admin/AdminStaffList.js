import axios from 'axios';
import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../Reusables/Styles';
import { useDataLayerValue } from '../Context/DataLayer';
import StaffHomeCard from '../../Reusables/StaffHomeCard';


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
        {staffs && <>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Administrators</Text>
            {staffs?.map((staff, i) => staff.type == 'admin' && <StaffHomeCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Barmen</Text>
            {staffs?.map((staff, i) => staff.type == 'barman' && <StaffHomeCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Cooks</Text>
            {staffs?.map((staff, i) => staff.type == 'cook' && <StaffHomeCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Waiters</Text>
            {staffs?.map((staff, i) => staff.type == 'waiter' && <StaffHomeCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
        </>}
      </ScrollView>
    </View>
  );
}
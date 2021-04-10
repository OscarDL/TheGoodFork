import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../../Reusables/Styles';
import { getStaff } from '../../../Functions/staff';
import { useDataLayerValue } from '../../Context/DataLayer';
import StaffHomeCard from '../../../Reusables/StaffHomeCard';


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
        onPress: () => getStaff(token)
      }
    ]
  );
}


export default function AdminStaffList({navigation}) {

  const [staffs, setStaffs] = useState(null);
  const [{token}, _] = useDataLayerValue();
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  useEffect(() => {
    if (isFocused && token) {
      getStaff(token).then(res => res.success ? setStaffs(res.users) : failureAlert(res, navigation)); 
    }
  }, [isFocused]);


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        {staffs && <>
          <View style={{marginTop: 6}}>
            <Text style={styles.title}>Administrators</Text>
            {staffs?.map((staff, i) => staff.type == 'admin' && <StaffHomeCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
          <View>
            <Text style={styles.title}>Barmen</Text>
            {staffs?.map((staff, i) => staff.type == 'barman' && <StaffHomeCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
          <View>
            <Text style={styles.title}>Cooks</Text>
            {staffs?.map((staff, i) => staff.type == 'cook' && <StaffHomeCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
          <View>
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
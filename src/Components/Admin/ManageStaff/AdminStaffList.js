import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import BaseCard from '../../../Reusables/BaseCard';
import { styles } from '../../../Reusables/Styles';
import { getStaff } from '../../../Functions/staff';
import { useDataLayerValue } from '../../Context/DataLayer';


const failureAlert = (error, navigation, setRetry) => Alert.alert(
  "Erreur d'affichage des membres", error,
  [{
    text: 'Annuler',
    onPress: () => navigation.goBack()
  },
  {
    text: 'Réessayer',
    onPress: () => setRetry(true)
  }]
);


export default function AdminStaffList({navigation}) {

  const [{token}, _] = useDataLayerValue();
  const [retry, setRetry] = useState(false);
  const [staffs, setStaffs] = useState(null);
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  useEffect(() => {
    if (isFocused || retry) getStaff(token).then(res => {
      res.success ? setStaffs(res.users) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry]);


  return (
    <View style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView>
        {staffs && <>
          <View style={{marginTop: 6}}>
            <Text style={styles.title}>Administrators</Text>
            {staffs?.map((staff, i) => staff.type == 'admin' && <BaseCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
          <View>
            <Text style={styles.title}>Barmen</Text>
            {staffs?.map((staff, i) => staff.type == 'barman' && <BaseCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
          <View>
            <Text style={styles.title}>Cooks</Text>
            {staffs?.map((staff, i) => staff.type == 'cook' && <BaseCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
          <View>
            <Text style={styles.title}>Waiters</Text>
            {staffs?.map((staff, i) => staff.type == 'waiter' && <BaseCard
              key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
              description={staff?.type} screen='AdminEditStaff' params={staff} navigation={navigation}
            />)}
          </View>
        </>}
      </ScrollView>
    </View>
  );
}
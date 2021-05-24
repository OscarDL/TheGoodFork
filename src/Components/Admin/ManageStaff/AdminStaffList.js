import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView, Platform, ActivityIndicator } from 'react-native';

import BaseCard from '../../../Shared/BaseCard';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getStaff } from '../../../Functions/staff';
import { useDataLayerValue } from '../../Context/DataLayer';


const failureAlert = (error, navigation, setRetry) => {
  const actions = [
    {
      text: 'Réessayer',
      onPress: () => setRetry(true)
    }, {
      text: 'Annuler',
      style: 'cancel',
      onPress: () => navigation.goBack()
    }
  ];

  Alert.alert(
  "Erreur d'affichage du staff", error,
  Platform.OS === 'ios' ? actions : actions.reverse()
  );
};


export default function AdminStaffList({navigation}) {
  const [{token}] = useDataLayerValue();
  const [retry, setRetry] = useState(false);
  const [staffs, setStaffs] = useState(null);
  const isFocused = useIsFocused(); // refresh data also when using navigation.goBack()

  useEffect(() => {
    if (isFocused || retry) getStaff(token).then(res => {
      res.success ? setStaffs(res.users) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry]);


  return staffs ? (
    <SafeAreaView style={{...styles.container, paddingHorizontal: 0}}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        <View>
          <Text style={styles.title}>Administrators</Text>
          {staffs?.map((staff, i) => staff.type == 'admin' && <BaseCard
            key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
            description={staff?.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
          />)}
        </View>
        <View>
          <Text style={styles.title}>Barmen</Text>
          {staffs?.map((staff, i) => staff.type == 'barman' && <BaseCard
            key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
            description={staff?.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
          />)}
        </View>
        <View>
          <Text style={styles.title}>Cooks</Text>
          {staffs?.map((staff, i) => staff.type == 'cook' && <BaseCard
            key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
            description={staff?.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
          />)}
        </View>
        <View>
          <Text style={styles.title}>Waiters</Text>
          {staffs?.map((staff, i) => staff.type == 'waiter' && <BaseCard
            key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
            description={staff?.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
          />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  );
}
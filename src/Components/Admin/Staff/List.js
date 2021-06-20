import { FAB } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Alert, SafeAreaView, Platform, ActivityIndicator } from 'react-native';

import Text from '../../Shared/Text';
import TouchCard from '../../Shared/TouchCard';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getStaff } from '../../../Functions/staff';


const pickerStyle = {
  inputIOS: styles.pickerInput,
  inputAndroid: styles.pickerInput,
  iconContainer: styles.pickerIconContainer
};

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
  "Erreur d'affichage du personnel", error,
  Platform.OS === 'ios' ? actions : actions.reverse()
  );
};


export default function AdminStaffList({navigation}) {
  const isFocused = useIsFocused();
  const [type, setType] = useState('all');
  const [staff, setStaff] = useState(null);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    if (isFocused || retry) getStaff().then(res => {
      res.success ? setStaff(res.staff) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry, setStaff]);


  return staff ? (
    <SafeAreaView style={{...styles.container, paddingHorizontal: 0}}>
      {staff.length > 0 ? (
        <ScrollView contentContainerStyle={{paddingVertical: 5}}>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Text style={{marginBottom: 10}}>Catégorie à afficher</Text>
            
            <View style={styles.pickerView}>
              <Picker
                items={[
                  { label: 'Staff complet', value: 'all', key: 0 },
                  { label: 'Administrateurs', value: 'admin', key: 1 },
                  { label: 'Barmans', value: 'barman', key: 2 },
                  { label: 'Cuisiniers', value: 'cook', key: 3 },
                  { label: 'Serveurs', value: 'waiter', key: 4 }
                ]}
                value={type}
                placeholder={{}}
                style={pickerStyle}
                useNativeAndroidPickerStyle={false}
                onValueChange={type => setType(type)}
                Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
              />
            </View>
          </View>

          <View>
            {(type === 'admin' || type === 'all') && <>
              <Text style={styles.title}>Administrateurs</Text>
              {staff
                .filter(staff => staff.type === 'admin')
                .sort((a, b) => a.firstName.localeCompare(b.firstName)).map((staff, i) => <TouchCard
                key={i} icon='how-to-reg' title={`${staff.firstName} ${staff.lastName}`} subtitle={staff.email}
                description={staff.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
              />)}
            </>}

            {(type === 'barman' || type === 'all') && <>
              <Text style={styles.title}>Barmans</Text>
              {staff
                .filter(staff => staff.type === 'barman')
                .sort((a, b) => a.firstName.localeCompare(b.firstName)).map((staff, i) => <TouchCard
                key={i} icon='how-to-reg' title={`${staff.firstName} ${staff.lastName}`} subtitle={staff.email}
                description={staff.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
              />)}
            </>}

            {(type === 'cook' || type === 'all') && <>
              <Text style={styles.title}>Cuisiniers</Text>
              {staff
                .filter(staff => staff.type === 'cook')
                .sort((a, b) => a.firstName.localeCompare(b.firstName)).map((staff, i) => <TouchCard
                key={i} icon='how-to-reg' title={`${staff.firstName} ${staff.lastName}`} subtitle={staff.email}
                description={staff.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
              />)}
            </>}

            {(type === 'waiter' || type === 'all') && <>
              <Text style={styles.title}>Serveurs</Text>
              {staff
                .filter(staff => staff.type === 'waiter')
                .sort((a, b) => a.firstName.localeCompare(b.firstName)).map((staff, i) => <TouchCard
                key={i} icon='how-to-reg' title={`${staff.firstName} ${staff.lastName}`} subtitle={staff.email}
                description={staff.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
              />)}
            </>}
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Aucun staff à afficher.</Text>
        </View>
      )}
      <FAB style={styles.fab} icon='plus' color='white' onPress={() => navigation.navigate('AdminCreateStaff', {type: type === 'all' ? null : type})}/>
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={60} color={colors.accentPrimary}/>
    </View>
  );
}
import { FAB } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Picker from 'react-native-picker-select';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert, SafeAreaView, Platform, ActivityIndicator } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getStaff } from '../../../Functions/staff';
import TouchCard from '../../../Shared/Components/TouchCard';


const pickerStyle = {
  inputIOS: {
    height: '100%',
    marginLeft: 12,
    marginRight: 28
  },
  inputAndroid: {
    height: '100%',
    marginRight: 20
  },
  iconContainer: {
    padding: 6,
    height: '100%'
  }
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
  "Erreur d'affichage du staff", error,
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
      res.success ? setStaff(res.users) : failureAlert(res, navigation, setRetry);
      setRetry(false);
    });
  }, [isFocused, retry, setRetry, setStaff]);


  return staff ? (
    <SafeAreaView style={{...styles.container, paddingHorizontal: 0}}>
      {staff?.length > 0 ? (
        <ScrollView contentContainerStyle={{paddingVertical: 5}}>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Text style={{marginBottom: 10}}>Catégorie à afficher</Text>
            
            <View style={styles.pickerView}>
              <Picker
                onValueChange={type => setType(type)}
                items={[
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Staff complet', value: 'all', key: 0 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Administrateurs', value: 'admin', key: 1 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Barmans', value: 'barman', key: 2 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Cuisiniers', value: 'cook', key: 3 },
                  { label: (Platform.OS !== 'ios' ? '   ' : '') + 'Serveurs', value: 'waiter', key: 4 }
                ]}
                value={type}
                placeholder={{}}
                style={pickerStyle}
                Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
              />
            </View>
          </View>

          <View>
            {(type === 'admin' || type === 'all') && <>
              <Text style={styles.title}>Administrateurs</Text>
              {staff?.map((staff, i) => staff.type == 'admin' && <TouchCard
                key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
                description={staff?.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
              />)}
            </>}

            {(type === 'barman' || type === 'all') && <>
              <Text style={styles.title}>Barmans</Text>
              {staff?.map((staff, i) => staff.type == 'barman' && <TouchCard
                key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
                description={staff?.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
              />)}
            </>}

            {(type === 'cook' || type === 'all') && <>
              <Text style={styles.title}>Cuisiniers</Text>
              {staff?.map((staff, i) => staff.type == 'cook' && <TouchCard
                key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
                description={staff?.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
              />)}
            </>}

            {(type === 'waiter' || type === 'all') && <>
              <Text style={styles.title}>Serveurs</Text>
              {staff?.map((staff, i) => staff.type == 'waiter' && <TouchCard
                key={i} icon='how-to-reg' title={`${staff?.firstName} ${staff?.lastName}`} subtitle={staff?.email}
                description={staff?.type} screen='AdminEditStaff' params={{staff}} navigation={navigation}
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
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  );
}
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Collapsible from 'react-native-collapsible';
import { Icon, Input, Button } from 'react-native-elements';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { View, Text, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';

import BaseCard from '../../Shared/BaseCard';
import { colors } from '../../Shared/colors';
import { styles } from '../../Shared/styles';
import UserAccountMap from './UserAccountMap';
import LogoutButton from '../../Shared/LogoutButton';
import { useDataLayerValue } from '../Context/DataLayer';
import { logout, updateUser } from '../../Functions/user';


const Stack = createStackNavigator();


export default function UserAccount({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title, headerRight: () => <LogoutButton/>, headerRightContainerStyle: {marginRight: 5}}}
        name='UserAccountComponent'
        component={UserAccountComponent}
      />
      <Stack.Screen options={{title: 'Carte interactive', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} name='UserAccountMap' component={UserAccountMap}/>
    </Stack.Navigator>
  );
}


function UserAccountComponent({navigation}) {
  const [{user, token}, dispatch] = useDataLayerValue();

  const [newUser, setNewUser] = useState(user);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);


  const handleUpdate = () => {
    setLoading(true);

    updateUser(newUser, token).then(res => {
      setLoading(false);
      Toast.show({
        text1: res.title ?? 'Erreur de modification',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
      res.success && dispatch({type: 'LOGIN', token, user: res.user});
    });
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        <BaseCard
          icon='map' title='Nous trouver en France' description='Adresse' screen='UserAccountMap'
          subtitle='Notre position sur une carte interactive !' navigation={navigation}
        />

        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed(!collapsed)}>
          <Icon style={{opacity: 0, paddingHorizontal: 10 /* Center title */}} name='expand-less'/>
          <Text style={styles.sectionText}>Vos informations</Text>
          <Icon style={{paddingHorizontal: 10}} name={collapsed ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed}>
          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Prénom</Text>
          <Input placeholder='Prénom' defaultValue={newUser.firstName} onChangeText={firstName => setNewUser({...newUser, firstName})} />

          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Nom</Text>
          <Input placeholder='Nom' defaultValue={newUser.lastName} onChangeText={lastName => setNewUser({...newUser, lastName})} />
          
          <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Adresse email</Text>
          <Input
            autoCapitalize='none'
            placeholder='Adresse email'
            keyboardType='email-address'
            defaultValue={newUser.email}
            onChangeText={email => setNewUser({...newUser, email})}
          />

          <Button
            icon={<Icon
              name='save'
              color='white'
              style={{marginRight: 10}}
            />}
            title='Sauvegarder'
            onPress={handleUpdate}
            buttonStyle={[{...styles.button, alignSelf: 'center'}]}
          />
        </Collapsible>
      </ScrollView>

      {loading && <View style={{...styles.container, ...styles.iosDateBackdrop, justifyContent: 'center'}}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
      </View>}
    </View>
  );
}
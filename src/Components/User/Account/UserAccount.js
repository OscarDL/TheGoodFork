import React from 'react';
import { View, ScrollView } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import UserEditData from './UserEditData';
import BaseCard from '../../../Shared/BaseCard';
import { styles } from '../../../Shared/styles';
import UserEditPassword from './UserEditPassword';
import UserSaveCreditCard from './UserSaveCreditCard';
import LogoutButton from '../../../Shared/LogoutButton';


const Stack = createStackNavigator();
const iosH = CardStyleInterpolators.forHorizontalIOS;


export default function UserAccount({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title, headerRight: () => <LogoutButton/>, headerRightContainerStyle: {marginRight: 5}}}
        name='UserAccountComponent'
        component={UserAccountComponent}
      />
      <Stack.Screen options={{title: 'Vos informations', cardStyleInterpolator: iosH}} name='UserEditData' component={UserEditData}/>
      <Stack.Screen options={{title: 'Votre mot de passe', cardStyleInterpolator: iosH}} name='UserEditPassword' component={UserEditPassword}/>
      <Stack.Screen options={{title: 'Votre carte bancaire', cardStyleInterpolator: iosH}} name='UserSaveCreditCard' component={UserSaveCreditCard}/>
    </Stack.Navigator>
  );
}


function UserAccountComponent({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        <BaseCard
          title='Informations personnelles' description='Modifiez votre nom, prénom et adresse email.'
          icon='how-to-reg' screen='UserEditData' navigation={navigation}
        />
        <BaseCard
          title='Mot de passe' description='Sécurisez votre compte en modifiant votre mot de passe, à tout moment si nécessaire.'
          icon='lock' screen='UserEditPassword' navigation={navigation}
        />
        <BaseCard
          title='Carte bancaire' description='Sauvegardez vos informations de paiement de manière sécurisée pour vos futurs paiements.'
          icon='credit-card' screen='UserSaveCreditCard' navigation={navigation}
        />
      </ScrollView>
    </View>
  );
}
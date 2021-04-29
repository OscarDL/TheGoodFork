import React, { useEffect } from 'react';
import { Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Login from './Auth/Login';
import Reset from './Auth/Reset';
import Forgot from './Auth/Forgot';
import Register from './Auth/Register';

import AdminHome from './Admin/AdminHome';
import AdminSettings from './Admin/AdminSettings';
import AdminTablesList from './Admin/AdminTablesList';
import AdminSalesStats from './Admin/AdminSalesStats';
import AdminStocksStats from './Admin/AdminStocksStats';
import AdminDailyRevenue from './Admin/AdminDailyRevenue';
import AdminDishes from './Admin/ManageDishes/AdminDishes';
import AdminEditDish from './Admin/ManageDishes/AdminEditDish';
import AdminStaffList from './Admin/ManageStaff/AdminStaffList';
import AdminEditStaff from './Admin/ManageStaff/AdminEditStaff';
import AdminCreateDish from './Admin/ManageDishes/AdminCreateDish';
import AdminRegisterStaff from './Admin/ManageStaff/AdminRegisterStaff';

import BarmanHome from './Barman/BarmanHome';

import WaiterHome from './Waiter/WaiterHome';
import WaiterNewOrder from './Waiter/SubmitOrder/WaiterNewOrder';
import WaiterEditOrder from './Waiter/SubmitOrder/WaiterEditOrder';
import WaiterCreateBill from './Waiter/TableBill/WaiterCreateBill';
import WaiterCheckOrders from './Waiter/CheckOrders/WaiterCheckOrders';
import WaiterManageTables from './Waiter/ManageTables/WaiterManageTables';
import WaiterOrderDetails from './Waiter/ValidateOrders/WaiterOrderDetails';
import WaiterValidateOrder from './Waiter/ValidateOrders/WaiterValidateOrder';

import CookHome from './Cook/CookHome';
import CookOrderDetails from './Cook/CookOrderDetails';

import UserDishes from './User/UserDishes';
import UserAccount from './User/UserAccount';
import UserPlanning from './User/UserPlanning';
import UserOrders from './User/Orders/UserOrders';

import { styles } from '../Reusables/Styles';
import { checkLogin, logout } from '../Functions/auth';
import { useDataLayerValue } from './Context/DataLayer';
import WaiterSubmitOrder from './Waiter/SubmitOrder/WaiterSubmitOrder';


const Stack = createStackNavigator();
const Tabs = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();

const iosV = CardStyleInterpolators.forVerticalIOS;
const iosH = CardStyleInterpolators.forHorizontalIOS;


export default function Routes() {
  const [{user, token}, dispatch] = useDataLayerValue();

  useEffect(() => { checkLogin(dispatch); }, [dispatch]);


  const authStack = () => (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' options={{title: 'Connexion'}} component={Login} />
      <Stack.Screen name='Register' options={{title: "S'enregistrer", cardStyleInterpolator: iosH}} component={Register} />
      <Stack.Screen name='Reset' options={{title: 'Récupération', cardStyleInterpolator: iosH}} component={Reset} />
      <Stack.Screen name='Forgot' options={{title: 'Mot de passe oublié', cardStyleInterpolator: iosH}} component={Forgot} />
    </Stack.Navigator>
  );

  const adminStack = () => (
    <Stack.Navigator initialRouteName='AdminHome'>
      <Stack.Screen name='AdminHome' component={AdminHome} options={({navigation}) => ({
        title: "Centre d'aministration",
        headerRight: () => <Button type='clear'
          buttonStyle={{marginRight: 10}}
          icon={<Icon name='settings' size={26} />}
          onPress={() => navigation.navigate('AdminSettings')}
        />
      })}/>
      <Stack.Screen name='AdminDishes' options={{title: 'Tous les plats', cardStyleInterpolator: iosH}} component={AdminDishes} />
      <Stack.Screen name='AdminEditDish' options={{title: 'Modifier plat', cardStyleInterpolator: iosH}} component={AdminEditDish} />
      <Stack.Screen name='AdminStaffList' options={{title: 'Personnel / Staff', cardStyleInterpolator: Platform.OS === 'ios' ? iosH : iosV}} component={AdminStaffList} />
      <Stack.Screen name='AdminCreateDish' options={{title: 'Nouveau plat', cardStyleInterpolator: iosH}} component={AdminCreateDish} />
      <Stack.Screen name='AdminTablesList' options={{title: 'Liste des tables', cardStyleInterpolator: iosH}} component={AdminTablesList} />
      <Stack.Screen name='AdminEditStaff' options={{title: 'Modifier un membre', cardStyleInterpolator: iosH}} component={AdminEditStaff} />
      <Stack.Screen name='AdminSalesStats' options={{title: 'Statistiques : ventes', cardStyleInterpolator: iosH}} component={AdminSalesStats} />
      <Stack.Screen name='AdminStocksStats' options={{title: 'Statistiques : stock', cardStyleInterpolator: iosH}} component={AdminStocksStats} />
      <Stack.Screen name='AdminDailyRevenue' options={{title: 'Revenu quotidien', cardStyleInterpolator: iosH}} component={AdminDailyRevenue} />
      <Stack.Screen name='AdminRegisterStaff' options={{title: 'Nouveau membre', cardStyleInterpolator: iosH}} component={AdminRegisterStaff} />
      <Stack.Screen name='AdminSettings' options={{title: 'Réglages', cardStyleInterpolator: Platform.OS === 'ios' ? iosH : iosV}} component={AdminSettings}/>
    </Stack.Navigator>
  );

  const barmanStack = () => (
    <Stack.Navigator initialRouteName='BarmanHome'>
      <Stack.Screen name='BarmanHome' component={BarmanHome} options={{
        title: 'Centre barmans',
        headerRight: () => <Button type='clear'
          buttonStyle={{marginRight: 10}}
          icon={<Icon name='logout' size={26} />}
          onPress={() => logout(dispatch)}
        />
      }}/>
    </Stack.Navigator>
  );

  const cookStack = () => (
    <Stack.Navigator initialRouteName='CookHome'>
      <Stack.Screen name='CookHome'  component={CookHome} options={{
        title: 'Centre cuisiniers',
        headerRight: () => <Button type='clear'
          buttonStyle={{marginRight: 10}}
          icon={<Icon name='logout' size={26} />}
          onPress={() => logout(dispatch)}
        />
      }}/>
      <Stack.Screen name='CookOrderDetails' options={{title: 'Détails de commande', cardStyleInterpolator: iosH}} component={CookOrderDetails}/>
    </Stack.Navigator>
  );

  const waiterStack = () => (
    <Stack.Navigator initialRouteName='WaiterHome'>
      <Stack.Screen name='WaiterHome' component={WaiterHome} options={{
        title: 'Centre serveurs',
        headerRight: () => <Button type='clear'
          buttonStyle={{marginRight: 10}}
          icon={<Icon name='logout' size={26} />}
          onPress={() => logout(dispatch)}
        />
      }}/>
      <Stack.Screen name='WaiterNewOrder' options={{title: 'Nouvelle commande', cardStyleInterpolator: Platform.OS === 'ios' ? iosH : iosV}} component={WaiterNewOrder}/>
      <Stack.Screen name='WaiterEditOrder' options={{title: 'Modifier commande', cardStyleInterpolator: iosH}} component={WaiterEditOrder}/>
      <Stack.Screen name='WaiterCreateBill' options={{title: 'Faire une addition', cardStyleInterpolator: iosH}} component={WaiterCreateBill}/>
      <Stack.Screen name='WaiterCheckOrders' options={{title: 'Commandes en cours', cardStyleInterpolator: iosH}} component={WaiterCheckOrders}/>
      <Stack.Screen name='WaiterOrderDetails' options={{title: 'Détails de commande', cardStyleInterpolator: iosH}} component={WaiterOrderDetails}/>
      <Stack.Screen name='WaiterValidateOrder' options={{title: 'Valider une commande', cardStyleInterpolator: iosH}} component={WaiterValidateOrder}/>
      <Stack.Screen name='WaiterSubmitOrder' options={{title: 'Vérification', cardStyleInterpolator: iosH}} component={WaiterSubmitOrder}/>
      <Stack.Screen name='WaiterManageTables' options={{title: 'Gérer les réservations', cardStyleInterpolator: iosH}} component={WaiterManageTables}/>
    </Stack.Navigator>
  );

  const userStack = () => (
    <Tabs.Navigator barStyle={{backgroundColor: 'white'}} activeColor='#39f' tabBarOptions={{activeTintColor: '#39f'}}>
      <Tabs.Screen name='UserPlanning' options={{ title: 'Réservations et disponibilités', tabBarLabel: 'Planning', tabBarIcon: ({color}) => <Icon color={color} name='event-available' /> }}>
        {props => <UserPlanning {...props} title='Planning' />}
      </Tabs.Screen>
      
      <Tabs.Screen name='UserDishes' options={{ title: 'Tous les plats', tabBarLabel: 'Menu', tabBarIcon: ({color}) => <Icon color={color} name='restaurant' /> }}>
        {props => <UserDishes {...props} title='Menu' />}
      </Tabs.Screen>
      
      <Tabs.Screen name='UserOrders' options={{ title: 'Vos commandes', tabBarLabel: 'Commandes', tabBarIcon: ({color}) => <Icon color={color} name='credit-card' /> }}>
        {props => <UserOrders {...props} title='Commandes' />}
      </Tabs.Screen>

      <Tabs.Screen name='UserAccount' options={{ title: 'Votre compte client', tabBarLabel: 'Compte', tabBarIcon: ({color}) => <Icon color={color} name='account-circle' /> }}>
        {props => <UserAccount {...props} title='Compte' />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );

  const components = {
    'auth': authStack,
    'admin': adminStack,
    'barman': barmanStack,
    'waiter': waiterStack,
    'cook': cookStack,
    'user': userStack
  };

  
  return (
    token === null ? <View style={styles.container}><ActivityIndicator/></View> :
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token === '' ? 'auth' : user?.type}>
        <Stack.Screen name={user?.type ?? 'auth'} options={{headerShown: false}} component={components[user?.type ?? 'auth']} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
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
import AdminCreateStaff from './Admin/ManageStaff/AdminCreateStaff';

import WaiterHome from './Waiter/WaiterHome';
import Bookings from './Waiter/ManageBookings/Day/Bookings';
import WaiterNewOrder from './Waiter/SubmitOrder/WaiterNewOrder';
import WaiterPayOrder from './Waiter/SubmitOrder/WaiterPayOrder';
import WaiterEditOrder from './Waiter/SubmitOrder/WaiterEditOrder';
import WaiterCreateBill from './Waiter/TableBill/WaiterCreateBill';
import EditBooking from './Waiter/ManageBookings/Edit/EditBooking';
import BookingDetails from './Waiter/ManageBookings/BookingDetails';
import WaiterPlanning from './Waiter/ManageBookings/WaiterPlanning';
import WaiterCheckOrders from './Waiter/CheckOrders/WaiterCheckOrders';
import WaiterSubmitOrder from './Waiter/SubmitOrder/WaiterSubmitOrder';
import WaiterOrderDetails from './Waiter/ValidateOrders/WaiterOrderDetails';
import WaiterValidateOrder from './Waiter/ValidateOrders/WaiterValidateOrder';

import BarmanHome from './Barman/BarmanHome';
import BarmanOrderDetails from './Barman/BarmanOrderDetails';

import CookHome from './Cook/CookHome';
import CookOrderDetails from './Cook/CookOrderDetails';

import UserDishes from './User/UserDishes';
import UserAccount from './User/UserAccount';
import UserOrders from './User/Orders/UserOrders';
import UserPlanning from './User/Booking/UserPlanning';

import { colors } from '../Shared/colors';
import { styles } from '../Shared/styles';
import { StatusBar } from 'expo-status-bar';
import LogoutButton from '../Shared/LogoutButton';
import { checkLogin, logout } from '../Functions/user';
import { useDataLayerValue } from './Context/DataLayer';


const Stack = createStackNavigator();
const Nav = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();

const iosH = CardStyleInterpolators.forHorizontalIOS;
const iosV = Platform.OS === 'ios' ? iosH : CardStyleInterpolators.forVerticalIOS;


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
      <Stack.Screen name='AdminHome' component={AdminHome} options={{
        title: 'Centre administrateur',
        headerRight: () => <LogoutButton/>,
        headerRightContainerStyle: {marginRight: 5}
      }}/>
      <Stack.Screen name='AdminSettings' options={{title: 'Réglages', cardStyleInterpolator: iosV}} component={AdminSettings}/>
      <Stack.Screen name='AdminDishes' options={{title: 'Tous les plats', cardStyleInterpolator: iosH}} component={AdminDishes} />
      <Stack.Screen name='AdminEditDish' options={{title: 'Modifier plat', cardStyleInterpolator: iosH}} component={AdminEditDish} />
      <Stack.Screen name='AdminStaffList' options={{title: 'Personnel / Staff', cardStyleInterpolator: iosH}} component={AdminStaffList} />
      <Stack.Screen name='AdminCreateDish' options={{title: 'Nouveau plat', cardStyleInterpolator: iosV}} component={AdminCreateDish} />
      <Stack.Screen name='AdminTablesList' options={{title: 'Liste des tables', cardStyleInterpolator: iosH}} component={AdminTablesList} />
      <Stack.Screen name='AdminEditStaff' options={{title: 'Modifier un membre', cardStyleInterpolator: iosH}} component={AdminEditStaff} />
      <Stack.Screen name='AdminSalesStats' options={{title: 'Statistiques : ventes', cardStyleInterpolator: iosH}} component={AdminSalesStats} />
      <Stack.Screen name='AdminStocksStats' options={{title: 'Statistiques : stock', cardStyleInterpolator: iosH}} component={AdminStocksStats} />
      <Stack.Screen name='AdminDailyRevenue' options={{title: 'Revenu quotidien', cardStyleInterpolator: iosH}} component={AdminDailyRevenue} />
      <Stack.Screen name='AdminCreateStaff' options={{title: 'Nouveau membre', cardStyleInterpolator: iosV}} component={AdminCreateStaff} />
    </Stack.Navigator>
  );

  const barmanStack = () => (
    <Stack.Navigator initialRouteName='BarmanHome'>
      <Stack.Screen name='BarmanHome' component={BarmanHome} options={{
        title: 'Centre barmans',
        headerRight: () => <LogoutButton/>,
        headerRightContainerStyle: {marginRight: 5}
      }}/>
      <Stack.Screen name='BarmanOrderDetails' options={{title: 'Détails de commande', cardStyleInterpolator: iosH}} component={BarmanOrderDetails}/>
    </Stack.Navigator>
  );

  const cookStack = () => (
    <Stack.Navigator initialRouteName='CookHome'>
      <Stack.Screen name='CookHome'  component={CookHome} options={{
        title: 'Centre cuisiniers',
        headerRight: () => <LogoutButton/>,
        headerRightContainerStyle: {marginRight: 5}
      }}/>
      <Stack.Screen name='CookOrderDetails' options={{title: 'Détails de commande', cardStyleInterpolator: iosH}} component={CookOrderDetails}/>
    </Stack.Navigator>
  );

  const waiterStack = () => (
    <Stack.Navigator initialRouteName='WaiterHome'>
      <Stack.Screen name='WaiterHome' component={WaiterHome} options={{
        title: 'Centre serveurs',
        headerRight: () => <LogoutButton/>,
        headerRightContainerStyle: {marginRight: 5}
      }}/>
      <Stack.Screen name='Bookings' options={{title: 'Disponibilités', cardStyleInterpolator: iosH}} component={Bookings}/>
      <Stack.Screen name='WaiterPlanning' options={{title: 'Réservations', cardStyleInterpolator: iosH}} component={WaiterPlanning}/>
      <Stack.Screen name='EditBooking' options={{title: 'Modifier réservation', cardStyleInterpolator: iosH}} component={EditBooking}/>
      <Stack.Screen name='BookingDetails' options={{title: 'Détails réservation', cardStyleInterpolator: iosH}} component={BookingDetails}/>
      <Stack.Screen name='WaiterNewOrder' options={{title: 'Nouvelle commande', cardStyleInterpolator: iosH}} component={WaiterNewOrder}/>
      <Stack.Screen name='WaiterPayOrder' options={{title: 'Payer commande', cardStyleInterpolator: iosV}} component={WaiterPayOrder}/>
      <Stack.Screen name='WaiterEditOrder' options={{title: 'Modifier commande', cardStyleInterpolator: iosH}} component={WaiterEditOrder}/>
      <Stack.Screen name='WaiterCreateBill' options={{title: 'Faire une addition', cardStyleInterpolator: iosH}} component={WaiterCreateBill}/>
      <Stack.Screen name='WaiterCheckOrders' options={{title: 'Commandes en cours', cardStyleInterpolator: iosH}} component={WaiterCheckOrders}/>
      <Stack.Screen name='WaiterOrderDetails' options={{title: 'Détails de commande', cardStyleInterpolator: iosH}} component={WaiterOrderDetails}/>
      <Stack.Screen name='WaiterValidateOrder' options={{title: 'Valider une commande', cardStyleInterpolator: iosH}} component={WaiterValidateOrder}/>
      <Stack.Screen name='WaiterSubmitOrder' options={{title: 'Vérification', cardStyleInterpolator: iosH}} component={WaiterSubmitOrder}/>
    </Stack.Navigator>
  );

  const userStack = () => (
    <Nav.Navigator barStyle={{backgroundColor: 'white'}} activeColor={colors.accentPrimary} tabBarOptions={{activeTintColor: colors.accentSecondary}}>
      <Nav.Screen name='UserPlanning' options={{tabBarLabel: 'Planning', tabBarIcon: ({color}) => <Icon color={color} name='event-available' />}}>
        {props => <UserPlanning {...props} title='Réservations'/>}
      </Nav.Screen>
      
      <Nav.Screen name='UserDishes' options={{tabBarLabel: 'Menu', tabBarIcon: ({color}) => <Icon color={color} name='restaurant' />}}>
        {props => <UserDishes {...props} title='Tous les plats'/>}
      </Nav.Screen>
      
      <Nav.Screen name='UserOrders' options={{tabBarLabel: 'Commandes', tabBarIcon: ({color}) => <Icon color={color} name='shopping-cart' />}}>
        {props => <UserOrders {...props} title='Vos commandes'/>}
      </Nav.Screen>

      <Nav.Screen name='UserAccount' options={{tabBarLabel: 'Compte', tabBarIcon: ({color}) => <Icon color={color} name='account-circle' />}}>
        {props => <UserAccount {...props} title='Votre compte'/>}
      </Nav.Screen>
    </Nav.Navigator>
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
    token === null ? (
      <View style={styles.container}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
      </View>
    ) : (<>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={token === '' ? 'auth' : user?.type}>
          <Stack.Screen name={user?.type ?? 'auth'} options={{headerShown: false}} component={components[user?.type ?? 'auth']} />
        </Stack.Navigator>
      </NavigationContainer>
    </>)
  );
}
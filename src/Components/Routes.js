import React, { useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { View, ActivityIndicator, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Login from './Auth/Login';
import Reset from './Auth/Reset';
import Forgot from './Auth/Forgot';
import Register from './Auth/Register';

import AdminHome from './Admin/Home';
import AdminDishList from './Admin/Dishes/List';
import AdminEditDish from './Admin/Dishes/Edit';
import AdminCreateDish from './Admin/Dishes/Create';
import AdminStaffList from './Admin/Staff/List';
import AdminEditStaff from './Admin/Staff/Edit';
import AdminCreateStaff from './Admin/Staff/Create';
import AdminTables from './Admin/Tables/Tables';
import AdminSalesStats from './Admin/Stats/Sales';
import AdminStocksStats from './Admin/Stats/Stocks';
import AdminDailyRevenue from './Admin/Revenue/Daily';

import WaiterHome from './Waiter/Home';
import WaiterNewOrder from './Waiter/Orders/New';
import WaiterPayOrder from './Waiter/Orders/Pay';
import WaiterEditOrder from './Waiter/Orders/Edit';
import WaiterCheckOrders from './Waiter/Orders/Check';
import WaiterSubmitOrder from './Waiter/Orders/Submit';
import WaiterOrderDetails from './Waiter/Orders/Details';
import WaiterValidateOrder from './Waiter/Orders/Validate';
import WaiterNewBooking from './Waiter/Bookings/New';
import WaiterEditBooking from './Waiter/Bookings/Edit';
import WaiterBookings from './Waiter/Bookings/Day/Bookings';
import WaiterPlanning from './Waiter/Bookings/Planning';
import WaiterCreateBill from './Waiter/Billing/Create';

import BarmanHome from './Barman/Home';
import BarmanOrderDetails from './Barman/OrderDetails';

import CookHome from './Cook/Home';
import CookOrderDetails from './Cook/OrderDetails';

import UserDishes from './User/Dishes/Dishes';
import UserOrders from './User/Orders/Orders';
import UserAccount from './User/Account/Account';
import UserPlanning from './User/Booking/Planning';

import { colors } from '../Shared/colors';
import { styles } from '../Shared/styles';
import { StatusBar } from 'expo-status-bar';
import { checkLogin } from '../Functions/user';
import { useAppContext } from '../Context/App/Provider';
import { useAuthContext } from '../Context/Auth/Provider';
import LogoutButton from '../Shared/Components/LogoutButton';


const Stack = createStackNavigator();
const Tabs = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();

const iosH = CardStyleInterpolators.forHorizontalIOS;
const iosV = Platform.OS === 'ios' ? iosH : CardStyleInterpolators.forVerticalIOS;


export default function Routes() {
  const [{darkTheme}] = useAppContext();
  const [{user, token}, authauthDispatch] = useAuthContext();

  useEffect(() => { checkLogin(authauthDispatch); }, [authauthDispatch]);


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
      <Stack.Screen name='AdminEditDish' options={{title: 'Modifier plat', cardStyleInterpolator: iosH}} component={AdminEditDish} />
      <Stack.Screen name='AdminDishList' options={{title: 'Tous les plats', cardStyleInterpolator: iosH}} component={AdminDishList} />
      <Stack.Screen name='AdminCreateDish' options={{title: 'Nouveau plat', cardStyleInterpolator: iosV}} component={AdminCreateDish} />
      <Stack.Screen name='AdminStaffList' options={{title: 'Personnel / Staff', cardStyleInterpolator: iosH}} component={AdminStaffList} />
      <Stack.Screen name='AdminEditStaff' options={{title: 'Modifier un membre', cardStyleInterpolator: iosH}} component={AdminEditStaff} />
      <Stack.Screen name='AdminCreateStaff' options={{title: 'Nouveau membre', cardStyleInterpolator: iosV}} component={AdminCreateStaff} />
      <Stack.Screen name='AdminTables' options={{title: 'Nombre de tables', cardStyleInterpolator: iosH}} component={AdminTables} />
      <Stack.Screen name='AdminSalesStats' options={{title: 'Statistiques : ventes', cardStyleInterpolator: iosH}} component={AdminSalesStats} />
      <Stack.Screen name='AdminStocksStats' options={{title: 'Statistiques : stock', cardStyleInterpolator: iosH}} component={AdminStocksStats} />
      <Stack.Screen name='AdminDailyRevenue' options={{title: 'Revenu quotidien', cardStyleInterpolator: iosH}} component={AdminDailyRevenue} />
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
      <Stack.Screen name='WaiterBookings' options={{title: 'Disponibilités', cardStyleInterpolator: iosH}} component={WaiterBookings}/>
      <Stack.Screen name='WaiterPlanning' options={{title: 'Réservations', cardStyleInterpolator: iosH}} component={WaiterPlanning}/>
      <Stack.Screen name='WaiterEditBooking' options={{title: 'Modifier réservation', cardStyleInterpolator: iosH}} component={WaiterEditBooking}/>
      <Stack.Screen name='WaiterNewBooking' options={{title: 'Nouvelle réservation', cardStyleInterpolator: iosH}} component={WaiterNewBooking}/>
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
    <Tabs.Navigator barStyle={{backgroundColor: 'white'}} activeColor={colors.accentPrimary} tabBarOptions={{activeTintColor: colors.accentPrimary}}>
      <Tabs.Screen name='UserPlanning' options={{tabBarLabel: 'Planning', tabBarIcon: ({color}) => <Icon color={color} name='event-available' />}}>
        {props => <UserPlanning {...props} title='Réservations'/>}
      </Tabs.Screen>
      
      <Tabs.Screen name='UserDishes' options={{tabBarLabel: 'Menu', tabBarIcon: ({color}) => <Icon color={color} name='restaurant' />}}>
        {props => <UserDishes {...props} title='Tous les plats'/>}
      </Tabs.Screen>
      
      <Tabs.Screen name='UserOrders' options={{tabBarLabel: 'Commandes', tabBarIcon: ({color}) => <Icon color={color} name='shopping-cart' />}}>
        {props => <UserOrders {...props} title='Vos commandes'/>}
      </Tabs.Screen>

      <Tabs.Screen name='UserAccount' options={{tabBarLabel: 'Compte', tabBarIcon: ({color}) => <Icon color={color} name='account-circle' />}}>
        {props => <UserAccount {...props} title='Votre compte'/>}
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
    token === null ? (
      <View style={styles.container}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
      </View>
    ) : (<>
      <StatusBar style={darkTheme ? 'light' : 'dark'}/>
      <NavigationContainer theme={darkTheme ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName={token === '' ? 'auth' : user.type}>
          <Stack.Screen name={user.type ?? 'auth'} options={{headerShown: false}} component={components[user.type ?? 'auth']} />
        </Stack.Navigator>
      </NavigationContainer>
    </>)
  );
}
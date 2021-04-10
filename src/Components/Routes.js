import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Icon } from 'react-native-elements';
import { View, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Login from './Auth/Login';
import Reset from './Auth/Reset';
import Forgot from './Auth/Forgot';
import Register from './Auth/Register';

import AdminHome from './Admin/AdminHome';
import AdminDishes from './Admin/ManageDishes/AdminDishes';
import AdminEditDish from './Admin/ManageDishes/AdminEditDish';
import AdminSettings from './Admin/AdminSettings';
import AdminStaffList from './Admin/ManageStaff/AdminStaffList';
import AdminEditStaff from './Admin/ManageStaff/AdminEditStaff';
import AdminCreateDish from './Admin/ManageDishes/AdminCreateDish';
import AdminTablesList from './Admin/AdminTablesList';
import AdminSalesStats from './Admin/AdminSalesStats';
import AdminStocksStats from './Admin/AdminStocksStats';
import AdminDailyRevenue from './Admin/AdminDailyRevenue';
import AdminRegisterStaff from './Admin/ManageStaff/AdminRegisterStaff';

import BarmanHome from './Barman/BarmanHome';

import WaiterHome from './Waiter/WaiterHome';
import WaiterCreateBill from './Waiter/TableBill/WaiterCreateBill';
import WaiterOrderDishes from './Waiter/SubmitOrder/WaiterOrderDishes';
import WaiterSubmitOrder from './Waiter/SubmitOrder/WaiterSubmitOrder';
import WaiterCheckOrders from './Waiter/CheckOrders/WaiterCheckOrders';
import WaiterOrderDetails from './Waiter/ValidateOrders/WaiterOrderDetails';
import WaiterManageTables from './Waiter/ManageTables/WaiterManageTables';
import WaiterValidateOrder from './Waiter/ValidateOrders/WaiterValidateOrder';

import CookHome from './Cook/CookHome';

import UserHome from './User/UserHome';

import { styles } from '../Reusables/Styles';
import { checkLogin } from '../Functions/auth';
import { useDataLayerValue } from './Context/DataLayer';


const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();


export default function Routes() {

  const [{user, token}, dispatch] = useDataLayerValue();

  const logout = async () => {
    await AsyncStorage.setItem('authToken', '');
    checkLogin(dispatch);
  }

  useEffect(() => { checkLogin(dispatch); }, [dispatch]);


  const authStack = () => (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Register' options={{title: 'Register'}} component={Register} />
      <Stack.Screen name='Login' options={{title: 'Login', headerLeft: null}} component={Login} />
      <Stack.Screen name='Reset' options={{title: 'Reset password', cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}} component={Reset} />
      <Stack.Screen name='Forgot' options={{title: 'Forgot password', cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}} component={Forgot} />
    </Stack.Navigator>
  );

  const adminStack = () => (
    <Stack.Navigator initialRouteName='AdminHome'>
      <Stack.Screen name='AdminHome' component={AdminHome} options={({navigation}) => ({
        title: 'Admin',
        headerRight: () => (<Button
          type='clear'
          icon={<Icon name='settings' size={26} type='material' />}
          onPress={() => navigation.navigate('AdminSettings')} buttonStyle={{marginRight: 10}}
        />)}
      )}/>
      <Stack.Screen name='AdminDishes' options={{title: 'Edit dishes', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminDishes} />
      <Stack.Screen name='AdminEditDish' options={{title: 'Edit dish', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminEditDish} />
      <Stack.Screen name='AdminStaffList' options={{title: 'Staff members', cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} component={AdminStaffList} />
      <Stack.Screen name='AdminSettings' options={{title: 'Settings', cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}} component={AdminSettings} />
      <Stack.Screen name='AdminCreateDish' options={{title: 'Create dish', cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} component={AdminCreateDish} />
      <Stack.Screen name='AdminTablesList' options={{title: 'Tables list', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminTablesList} />
      <Stack.Screen name='AdminEditStaff' options={{title: 'Edit staff member', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminEditStaff} />
      <Stack.Screen name='AdminSalesStats' options={{title: 'Sales statistics', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminSalesStats} />
      <Stack.Screen name='AdminStocksStats' options={{title: 'Stocks statistics', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminStocksStats} />
      <Stack.Screen name='AdminDailyRevenue' options={{title: 'Daily revenue', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminDailyRevenue} />
      <Stack.Screen name='AdminRegisterStaff' options={{title: 'Register staff', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminRegisterStaff} />
    </Stack.Navigator>
  );

  const barmanStack = () => (
    <Stack.Navigator initialRouteName='BarmanHome'>
      <Stack.Screen name='BarmanHome' options={{title: 'Barman', headerRight: () => (<Button title='Log out' onPress={logout} buttonStyle={{...styles.button, marginRight: 10}} />)}} component={BarmanHome} />
    </Stack.Navigator>
  );

  const waiterStack = () => (
    <Stack.Navigator initialRouteName='WaiterHome'>
      <Stack.Screen name='WaiterHome' options={{title: 'Waiter', headerRight: () => (<Button title='Log out' onPress={logout} buttonStyle={{...styles.button, marginRight: 10}} />)}} component={WaiterHome} />
      <Stack.Screen name='WaiterManageTables' options={{title: 'Manage table reservations', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={WaiterManageTables} />
      <Stack.Screen name='WaiterValidateOrder' options={{title: 'Validate an order', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={WaiterValidateOrder} />
      <Stack.Screen name='WaiterOrderDishes' options={{title: 'Add to order', cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} component={WaiterOrderDishes} />
      <Stack.Screen name='WaiterSubmitOrder' options={{title: 'Submit an order', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={WaiterSubmitOrder} />
      <Stack.Screen name='WaiterCheckOrders' options={{title: 'Orders status', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={WaiterCheckOrders} />
      <Stack.Screen name='WaiterCreateBill' options={{title: 'Make a bill', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={WaiterCreateBill} />
      <Stack.Screen name='WaiterOrderDetails' options={{title: 'Order details', cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} component={WaiterOrderDetails} />
    </Stack.Navigator>
  );

  const cookStack = () => (
    <Stack.Navigator initialRouteName='CookHome'>
      <Stack.Screen name='CookHome' options={{title: 'Cook', headerRight: () => (<Button title='Log out' onPress={logout} buttonStyle={{...styles.button, marginRight: 10}} />)}} component={CookHome} />
    </Stack.Navigator>
  );

  const userStack = () => (
    <Tabs.Navigator barStyle={{ backgroundColor: 'white' }} activeColor='#111' initialRouteName='UserHome'>
      <Tabs.Screen name='UserHome' options={{ title: 'Home', tabBarIcon: ({color}) => <Icon color={color} type='material' name='home' /> }}>
        {props => <UserHome {...props} title='Home' />}
      </Tabs.Screen>

      <Tabs.Screen name='UserPlanning' options={{ title: 'Planning', tabBarIcon: ({color}) => <Icon color={color} type='material' name='event-available' /> }}>
        {props => <UserHome {...props} title='Planning' />}
      </Tabs.Screen>
      
      <Tabs.Screen name='UserOrders' options={{ title: 'Orders', tabBarIcon: ({color}) => <Icon color={color} type='material' name='account-circle' /> }}>
        {props => <UserHome {...props} title='Orders' />}
      </Tabs.Screen>
      
      <Tabs.Screen name='UserSomething' options={{ title: 'Something', tabBarIcon: ({color}) => <Icon color={color} type='material' name='account-circle' /> }}>
        {props => <UserHome {...props} title='Something' />}
      </Tabs.Screen>
      
      <Tabs.Screen name='UserAccount' options={{ title: 'Account', tabBarIcon: ({color}) => <Icon color={color} type='material' name='account-circle' /> }}>
        {props => <UserHome {...props} title='Account' />}
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
    token === null ? <View><ActivityIndicator/></View> :
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token === '' ? 'auth' : user?.type}>
        <Stack.Screen name={user?.type ?? 'auth'} options={{headerShown: false}} component={components[user?.type ?? 'auth']} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
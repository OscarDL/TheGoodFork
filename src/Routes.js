import axios from 'axios';
import { View } from 'react-native';
import React, { useEffect } from 'react';
import { Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Login from './Auth/Login';
import Reset from './Auth/Reset';
import Forgot from './Auth/Forgot';
import Register from './Auth/Register';

import AdminHome from './Admin/AdminHome';
import AdminDishes from './Admin/AdminDishes';
import AdminStaffList from './Admin/AdminStaffList';
import AdminEditStaff from './Admin/AdminEditStaff';
import AdminTablesList from './Admin/AdminTablesList';
import AdminSalesStats from './Admin/AdminSalesStats';
import AdminStocksStats from './Admin/AdminStocksStats';
import AdminDailyRevenue from './Admin/AdminDailyRevenue';
import AdminRegisterStaff from './Admin/AdminRegisterStaff';

import BarmanHome from './Barman/BarmanHome';

import WaiterHome from './Waiter/WaiterHome';

import CookHome from './Cook/CookHome';

import UserHome from './User/UserHome';

import Settings from './Settings';
import { styles } from './Styles';
import { useDataLayerValue } from './Context/DataLayer';


const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();


export default function Routes() {

  const [{user, token}, dispatch] = useDataLayerValue();

  const logout = async () => {
    await AsyncStorage.setItem('authToken', '');
    isLoggedIn();
  }

  const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if(token) {
      DispatchUserInfo(token);
    } else {
      dispatch({type: 'SET_USER', user: null});
      dispatch({type: 'SET_TOKEN', token: ''});
    }
  };

  const DispatchUserInfo = async (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    try {

      const {data} = await axios.get('https://the-good-fork.herokuapp.com/api/auth/userinfo', config);
      if (data?.user) {
        await AsyncStorage.setItem('authToken', token);
        dispatch({type: 'SET_USER', user: data.user});
        dispatch({type: 'SET_TOKEN', token});
      }

    } catch (error) { await AsyncStorage.setItem('authToken', ''); }
  }

  useEffect(() => { isLoggedIn(); }, []);


  const authStack = () => {
    return (
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Register' options={{title: 'Register'}} component={Register} />
        <Stack.Screen name='Login' options={{title: 'Login', headerLeft: null}} component={Login} />
        <Stack.Screen name='Reset' options={{title: 'Reset password', cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}} component={Reset} />
        <Stack.Screen name='Forgot' options={{title: 'Forgot password', cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}} component={Forgot} />
      </Stack.Navigator>
    );
  }

  const adminStack = () => {
    return (
      <Stack.Navigator initialRouteName='AdminHome'>
        <Stack.Screen name='AdminHome' component={AdminHome} options={({navigation}) => ({
          title: 'Admin',
          headerRight: () => (<Button type='clear' icon={<Icon name='settings' size={26} type='material' />} onPress={() => navigation.navigate('Settings')} buttonStyle={{marginRight: 10}} />)}
        )}/>
        <Stack.Screen name='AdminDishes' options={{title: 'Edit dishes', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminDishes} />
        <Stack.Screen name='AdminTablesList' options={{title: 'Tables list', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminTablesList} />
        <Stack.Screen name='AdminStaffList' options={{title: 'Staff members', cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} component={AdminStaffList} />
        <Stack.Screen name='AdminEditStaff' options={{title: 'Edit staff member', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminEditStaff} />
        <Stack.Screen name='AdminSalesStats' options={{title: 'Sales statistics', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminSalesStats} />
        <Stack.Screen name='AdminStocksStats' options={{title: 'Stocks statistics', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminStocksStats} />
        <Stack.Screen name='AdminDailyRevenue' options={{title: 'Daily revenue', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminDailyRevenue} />
        <Stack.Screen name='AdminRegisterStaff' options={{title: 'Register staff', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} component={AdminRegisterStaff} />
      </Stack.Navigator>
    );
  }

  const barmanStack = () => {
    return (
      <Stack.Navigator initialRouteName='BarmanHome'>
        <Stack.Screen name='BarmanHome' options={{title: 'Barman', headerRight: () => (<Button title='Log out' onPress={logout} buttonStyle={{...styles.button, marginRight: 10}} />)}} component={BarmanHome} />
      </Stack.Navigator>
    );
  }

  const waiterStack = () => {
    return (
      <Stack.Navigator initialRouteName='WaiterHome'>
        <Stack.Screen name='WaiterHome' options={{title: 'Waiter', headerRight: () => (<Button title='Log out' onPress={logout} buttonStyle={{...styles.button, marginRight: 10}} />)}} component={WaiterHome} />
      </Stack.Navigator>
    );
  }

  const cookStack = () => {
    return (
      <Stack.Navigator initialRouteName='CookHome'>
        <Stack.Screen name='CookHome' options={{title: 'Cook', headerRight: () => (<Button title='Log out' onPress={logout} buttonStyle={{...styles.button, marginRight: 10}} />)}} component={CookHome} />
      </Stack.Navigator>
    );
  }

  const userStack = () => {
    return (
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
  }

  const components = {
    'auth': authStack,
    'admin': adminStack,
    'barman': barmanStack,
    'waiter': waiterStack,
    'cook': cookStack,
    'user': userStack
  };

  return (
    token === null ? <View></View> :
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token === '' ? 'auth' : user?.type}>
        <Stack.Screen name='Settings' options={{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}} component={Settings} />
        <Stack.Screen name={user?.type ?? 'auth'} options={{headerShown: false}} component={components[user?.type ?? 'auth']} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
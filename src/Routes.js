import axios from 'axios';
import { View } from 'react-native';
import React, { useEffect } from 'react';
import { Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Login from './Auth/Login';
import Reset from './Auth/Reset';
import Forgot from './Auth/Forgot';
import Register from './Auth/Register';

import UserHome from './User/UserHome';

import AdminHome from './Admin/AdminHome';
import AdminDishes from './Admin/AdminDishes';
import AdminStaffList from './Admin/AdminStaffList';
import AdminEditStaff from './Admin/AdminEditStaff';
import AdminTablesList from './Admin/AdminTablesList';
import AdminSalesStats from './Admin/AdminSalesStats';
import AdminStocksStats from './Admin/AdminStocksStats';
import AdminDailyRevenue from './Admin/AdminDailyRevenue';
import AdminRegisterStaff from './Admin/AdminRegisterStaff';

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
      DispatchUserInfo(token)
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
        <Stack.Screen name='Reset' options={{title: 'Reset password'}} component={Reset} />
        <Stack.Screen name='Forgot' options={{title: 'Forgot password'}} component={Forgot} />
        <Stack.Screen name='Login' options={{title: 'Login', headerLeft: null}} component={Login} />
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

  const adminStack = () => {
    return (
      <Stack.Navigator initialRouteName='AdminHome'>
        <Stack.Screen name='AdminHome' options={{title: 'Admin', headerRight: () => (<Button title='Log out' onPress={logout} buttonStyle={{...styles.button, marginRight: 10}} />)}} component={AdminHome} />
        <Stack.Screen name='AdminDishes' options={{title: 'Edit dishes'}} component={AdminDishes} />
        <Stack.Screen name='AdminTablesList' options={{title: 'Tables list'}} component={AdminTablesList} />
        <Stack.Screen name='AdminStaffList' options={{title: 'Staff members'}} component={AdminStaffList} />
        <Stack.Screen name='AdminEditStaff' options={{title: 'Edit staff member'}} component={AdminEditStaff} />
        <Stack.Screen name='AdminSalesStats' options={{title: 'Sales statistics'}} component={AdminSalesStats} />
        <Stack.Screen name='AdminStocksStats' options={{title: 'Stocks statistics'}} component={AdminStocksStats} />
        <Stack.Screen name='AdminDailyRevenue' options={{title: 'Daily revenue'}} component={AdminDailyRevenue} />
        <Stack.Screen name='AdminRegisterStaff' options={{title: 'Register staff'}} component={AdminRegisterStaff} />
      </Stack.Navigator>
    );
  }

  const components = {
    'admin': adminStack,
    'auth': authStack,
    'user': userStack
  };

  return (
    token === null ? <View></View> :
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token === '' ? 'auth' : user?.type}>
        <Stack.Screen name={user?.type ?? 'auth'} options={{headerShown: false}} component={components[user?.type ?? 'auth']} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
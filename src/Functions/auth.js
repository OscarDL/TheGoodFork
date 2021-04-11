import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiUrl } from '../../config';


export const login = async (user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    user.email = user.email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'auth/login', user, config);

    if (!data.success) return data?.error;
    
    return data;

  } catch (error) { return error.response?.data.error || "Unknown error."; }
};


export const registerUser = async (user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    user.email = user.email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'auth/register', user, config);

    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || "Unknown error."; }
};


export const dispatchUserInfo = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const {data} = await axios.get(apiUrl + 'auth/userinfo', config);
    
    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || "Unkonwn error."; }
};


export const sendEmail = async (email) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    email = email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'auth/forgotpassword', {email}, config);

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: "Password reset",
      desc: data.data
    };

  } catch (error) { return error.response?.data.error || "Unknown error."; }
};


export const resetPassword = async (resetToken, password, passCheck) => {
  if (!resetToken)
    return "Please type-in the reset code you received via email.";

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const {data} = await axios.put(apiUrl + 'auth/resetpassword/' + resetToken, {password, passCheck}, config);

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: 'Password reset',
      desc: data.data
    };
  } catch (error) { return error.response?.data.error || "Unknown error."; }
}


export const checkLogin = async (dispatch) => {
  AsyncStorage.getItem('authToken').then(token => {

    if (!token) {
      dispatch({type: 'SET_USER', user: null});
      return dispatch({type: 'SET_TOKEN', token: ''});
    }

    dispatchUserInfo(token).then(async (res) => {
      if (res.success) {
        dispatch({type: 'SET_USER', user: res.user});
        dispatch({type: 'SET_TOKEN', token});
      } else Alert.alert(
        "Login error", "Could not retrieve your information. Please sign in again.",
        [{
          "text": "OKAY",
          onPress: async () => {
            await AsyncStorage.removeItem('authToken');
            dispatch({type: 'SET_USER', user: null});
            dispatch({type: 'SET_TOKEN', token: ''});
          }
        }]
      );
    });

  });
};


export const logout = async (dispatch) => {
  await AsyncStorage.removeItem('authToken', '')
  checkLogin(dispatch);
}
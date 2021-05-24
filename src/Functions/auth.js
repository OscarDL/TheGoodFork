import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiUrl } from '../../config';
import { config, authConfig } from './utils';


export const login = async (user) => {
  try {
    user.email = user.email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'auth/login', user, config);

    if (!data.success) return data?.error;
    
    return data;

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const register = async (user) => {
  try {
    user.email = user.email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'auth/register', user, config);

    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const dispatchUserData = async (token) => {
  try {
    const {data} = await axios.get(apiUrl + 'auth', authConfig(token));
    
    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const sendEmail = async (email) => {
  try {
    email = email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'auth/forgot', {email}, config);

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: 'Email de récupération',
      desc: data.data
    };

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const resetPassword = async (token, password, passCheck) => {
  if (!token) return 'Veuillez entrer le code reçu par email.';

  try {
    const {data} = await axios.put(apiUrl + 'auth/reset/' + token, {password, passCheck}, config);

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: 'Réinitialisation réussie',
      desc: data.data
    };
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const checkLogin = async (dispatch) => {
  const token = await AsyncStorage.getItem('authToken');

  if (!token) return dispatch({ type: 'LOGIN', user: null, token: '' });

  dispatchUserData(token).then(async (res) => {
    if (res.success) return dispatch({ type: 'LOGIN', user: res.user, token });
    
    Alert.alert(
      'Erreur de connexion', 'Erreur lors de la connexion automatique. Merci de vous reconnecter.',
      [{
        text: 'Compris',
        onPress: async () => {
          await AsyncStorage.removeItem('authToken');
          dispatch({ type: 'LOGIN', user: null, token: '' });
        }
      }]
    );
  });
};


export const logout = (dispatch) => {
  AsyncStorage.removeItem('authToken').then(() => checkLogin(dispatch));
};
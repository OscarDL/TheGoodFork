import axios from 'axios';
import { Alert } from 'react-native';
import { getItemAsync, deleteItemAsync } from 'expo-secure-store';

import { apiUrl } from '../../config';
import { config, authConfig } from './utils';


export const login = async (user) => {
  try {
    user.email = user.email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'user/login', user, config);

    if (!data.success) return data?.error;
    
    return data;

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const register = async (user) => {
  try {
    user.email = user.email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'user/register', user, config);

    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getUserData = async (token) => {
  try {
    const {data} = await axios.get(apiUrl + 'user', authConfig(token));
    
    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const sendEmail = async (email) => {
  try {
    email = email.replace(' ', '');
    const {data} = await axios.put(apiUrl + 'user/forgot', {email}, config);

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
    const {data} = await axios.put(apiUrl + 'user/reset/' + token, {password, passCheck}, config);

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: 'Réinitialisation réussie',
      desc: data.data
    };
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const updateData = async (user, token) => {
  try {
    user.email = user.email.replace(' ', '');
    const {data} = await axios.put(apiUrl + 'user/data', user, authConfig(token));
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification réussie',
      desc: 'Votre compte a bien été mis à jour.',
      user: data.user
    };
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const updatePassword = async (current, password, passCheck, token) => {
  try {
    const {data} = await axios.put(apiUrl + 'user/password', {current, password, passCheck}, authConfig(token));
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification réussie',
      desc: 'Votre mot de passe a bien été mis à jour.',
      user: data.user
    };
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const deleteUser = async (token) => {
  try {
    const {data} = await axios.delete(apiUrl + 'user', authConfig(token));
    
    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const checkLogin = async (dispatch) => {
  const token = await getItemAsync('authToken');

  if (!token) return dispatch({ type: 'LOGIN', user: null, token: '' });

  getUserData(token).then(async (res) => {
    if (res.success) return dispatch({ type: 'LOGIN', user: res.user, token });
    
    Alert.alert(
      'Erreur de connexion', 'Erreur lors de la connexion automatique. Merci de vous reconnecter.',
      [{
        text: 'Compris',
        onPress: async () => {
          await deleteItemAsync('authToken');
          dispatch({ type: 'LOGIN', user: null, token: '' });
        }
      }]
    );
  });
};


export const logout = (dispatch) => {
  deleteItemAsync('authToken').then(() => checkLogin(dispatch));
};
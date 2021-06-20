import axios from 'axios';
import { Alert } from 'react-native';
import { getItemAsync, deleteItemAsync } from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiUrl } from '../../config';
import { config, authConfig } from './utils';


export const login = async (user) => {
  try {
    user.email = user.email?.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'user/login', user, config);

    if (!data.success) return data?.error;
    
    return data;

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const register = async (user) => {
  try {
    user.email = user.email?.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'user/register', user, config);

    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getUserData = async (token) => {
  try {
    const config = await authConfig(token);
    const {data} = await axios.get(apiUrl + 'user', config);
    
    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const sendEmail = async (email) => {
  try {
    email = email?.replace(' ', '');
    const {data} = await axios.put(apiUrl + 'user/forgot', {email}, config);

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: 'Email de récupération',
      desc: 'Email envoyé à ' + email + ' avec succès.'
    };

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const resetPassword = async (resetToken, password, passCheck) => {
  if (!resetToken) return 'Veuillez entrer le code reçu par email.';

  try {
    const {data} = await axios.put(apiUrl + 'user/reset/' + resetToken, {password, passCheck}, config);

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: 'Récupération réussie',
      desc: 'Mot de passe réinitialisé avec succès.'
    };
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const updateData = async (user) => {
  try {
    user.email = user.email?.replace(' ', '');
    
    const config = await authConfig();
    const {data} = await axios.put(apiUrl + 'user/data', user, config);
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification réussie',
      desc: 'Votre compte a bien été mis à jour.',
      user: data.user
    };
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const updatePassword = async (current, password, passCheck) => {
  try {
    const config = await authConfig();
    const {data} = await axios.put(apiUrl + 'user/password', {current, password, passCheck}, config);
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification réussie',
      desc: 'Votre mot de passe a bien été mis à jour.'
    };
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const deleteUser = async () => {
  try {
    const config = await authConfig();
    const {data} = await axios.delete(apiUrl + 'user', config);
    
    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const checkLogin = async (authDispatch) => {
  let token = null, signedIn = null;

  try {
    signedIn = await AsyncStorage.getItem('signedIn');
    token = await getItemAsync('authToken');
  } catch { }

  if (!eval(signedIn)) {
    // Manually reset secure store after app uninstall (iOS)
    if (signedIn === null) {
      try {
        await deleteItemAsync('authToken');
        await deleteItemAsync('card');
      } catch { }
    }

    return authDispatch({ type: 'LOGIN', user: {} });
  }

  getUserData(token).then(async (res) => {
    if (res.success) return authDispatch({ type: 'LOGIN', user: res.user });
    
    Alert.alert(
      'Erreur de connexion', 'Erreur lors de la connexion automatique. Merci de vous reconnecter.',
      [{
        text: 'Compris',
        onPress: async () => {
          try { await deleteItemAsync('authToken'); } catch { }
          await AsyncStorage.setItem('signedIn', 'false');
          authDispatch({ type: 'LOGIN', user: {} });
        }
      }]
    );
  });
};


export const logout = (authDispatch) => {
  AsyncStorage.setItem('signedIn', 'false').then(() => checkLogin(authDispatch));
};
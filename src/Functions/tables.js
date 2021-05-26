import axios from 'axios';

import { authConfig } from './utils';
import { apiUrl } from '../../config';


export const getTables = async (token) => {
  try {
    const {data} = await axios.get(apiUrl + 'tables', authConfig(token));

    if (!data.success) return data?.error;

    return {success: true, tables: data.tables};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const updateTables = async (amount, token) => {
  try {
    const {data} = await axios.put(apiUrl + 'tables', {amount}, authConfig(token));

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification',
      desc: 'Ajout de tables effectué avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
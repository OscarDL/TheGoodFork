import axios from 'axios';

import { authConfig } from './utils';
import { apiUrl } from '../../config';


export const getTables = async () => {
  try {
    const config = await authConfig();
    const {data} = await axios.get(apiUrl + 'tables', config);

    if (!data.success) return data?.error;

    return {success: true, tables: data.tables};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const updateTables = async (amount) => {
  try {
    const config = await authConfig();
    const {data} = await axios.put(apiUrl + 'tables', {amount}, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification',
      desc: 'Ajout de tables effectué avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
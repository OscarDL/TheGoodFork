import axios from 'axios';

import { authConfig } from './utils';
import { apiUrl } from '../../config';


export const payOrder = async (card, order) => {
  try {
    const config = await authConfig();
    const {data} = await axios.post(apiUrl + 'stripe', {card, order}, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Paiement',
      desc: 'Commande payée avec succès.',
      
      intent: data.intent
    }
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getIntent = async (intent) => {
  try {
    const config = await authConfig();
    const {data} = await axios.get(apiUrl + 'stripe/' + intent, config);

    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
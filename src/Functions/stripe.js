import axios from 'axios';

import { authConfig } from './utils';
import { apiUrl } from '../../config';


export const payOrder = async (card, order, token) => {
  try {
    const {data} = await axios.post(apiUrl + 'stripe', {card, order}, authConfig(token));

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Paiement',
      desc: 'Commande payée avec succès.',
      
      intent: data.intent
    }
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getIntent = async (intent, token) => {
  try {
    const {data} = await axios.get(apiUrl + 'stripe/' + intent, authConfig(token));

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
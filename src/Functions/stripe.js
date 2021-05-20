import axios from 'axios';

import { apiUrl } from '../../config';


export const payOrder = async (card, order, token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const {data} = await axios.post(apiUrl + 'stripe/pay', {card, order}, {headers});

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
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const {data} = await axios.get(apiUrl + 'stripe/get/' + intent, {headers});

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const cancelIntent = async (intent, token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const {data} = await axios.get(apiUrl + 'stripe/refund/' + intent, {headers});

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
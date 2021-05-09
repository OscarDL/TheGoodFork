import axios from 'axios';

import { apiUrl } from '../../config';


export const getBookings = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const {data} = await axios.get(apiUrl + 'bookings', config);

    if (!data.success) return data?.error;

    return {success: true, bookings: data.bookings};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getDayBookings = async (day) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const {data} = await axios.get(apiUrl + 'bookings/day/' + day.timestamp, config);

    if (!data.success) return data?.error;
    
    return data.bookings;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getBooking = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const {data} = await axios.get(apiUrl + 'bookings/' + id, config);

    if (!data.success) return data?.error;

    return {success: true, booking: data.booking};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const editBooking = async (booking, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  
  try {
    const {data} = await axios.put(apiUrl + 'bookings/update/' + booking._id, booking, config);
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification',
      desc: 'Réservation modifiée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const submitBooking = async (booking, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  
  try {
    const {data} = await axios.post(apiUrl + 'bookings/create', booking, config);
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Nouvelle réservation',
      desc: 'Réservation effectuée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const deleteBooking = async (booking, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const {data} = await axios.delete(apiUrl + 'bookings/delete/' + booking._id, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Annulation',
      desc: 'Réservation annulée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
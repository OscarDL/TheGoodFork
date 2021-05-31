import axios from 'axios';

import { authConfig } from './utils';
import { apiUrl } from '../../config';


export const getBookings = async (token) => {
  try {
    const {data} = await axios.get(apiUrl + 'bookings', authConfig(token));

    if (!data.success) return data?.error;

    return {success: true, bookings: data.bookings};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getDayBookings = async (day, token) => {
  try {
    const {data} = await axios.get(apiUrl + 'bookings/day/' + day, authConfig(token));

    if (!data.success) return data?.error;
    
    return data.bookings;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getBooking = async (id, token) => {
  try {
    const {data} = await axios.get(apiUrl + 'bookings/' + id, authConfig(token));

    if (!data.success) return data?.error;

    return {success: true, booking: data.booking};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const newBooking = async (booking, token) => {
  try {
    booking.user.email = booking.user.email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'bookings', booking, authConfig(token));
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Nouvelle réservation',
      desc: 'Réservation effectuée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const editBooking = async (booking, token) => {
  try {
    const {data} = await axios.put(apiUrl + 'bookings/' + booking._id, booking, authConfig(token));
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification',
      desc: 'Réservation modifiée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const deleteBooking = async (booking, token) => {
  try {
    const {data} = await axios.delete(apiUrl + 'bookings/' + booking._id, authConfig(token));

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Annulation',
      desc: 'Réservation annulée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
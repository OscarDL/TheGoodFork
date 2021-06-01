import axios from 'axios';

import { authConfig } from './utils';
import { apiUrl } from '../../config';


export const getBookings = async () => {
  try {
    const config = await authConfig();
    const {data} = await axios.get(apiUrl + 'bookings', config);

    if (!data.success) return data?.error;

    return {success: true, bookings: data.bookings};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getDayBookings = async (day) => {
  try {
    const config = await authConfig();
    const {data} = await axios.get(apiUrl + 'bookings/day/' + day, config);

    if (!data.success) return data?.error;
    
    return {success: true, bookings: data.bookings};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const newBooking = async (booking) => {
  try {
    booking.user.email = booking.user.email.replace(' ', '');
    
    const config = await authConfig();
    const {data} = await axios.post(apiUrl + 'bookings', booking, config);
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Nouvelle réservation',
      desc: 'Réservation effectuée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const editBooking = async (booking) => {
  try {
    const config = await authConfig();
    const {data} = await axios.put(apiUrl + 'bookings/' + booking._id, booking, config);
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification',
      desc: 'Réservation modifiée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const deleteBooking = async (booking) => {
  try {
    const config = await authConfig();
    const {data} = await axios.delete(apiUrl + 'bookings/' + booking._id, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Annulation',
      desc: 'Réservation annulée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
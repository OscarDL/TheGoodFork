import axios from 'axios';

import { authConfig } from './utils';
import { apiUrl } from '../../config';


export const getStaff = async (token) => {
  try {
    const {data} = await axios.get(apiUrl + 'staff', authConfig(token));

    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const createStaff = async (staff, token) => {
  try {
    staff.email = staff.email.replace(' ', '');
    const {data} = await axios.post(apiUrl + 'staff', staff, authConfig(token));

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: 'Création de compte',
      desc: 'Votre nouveau membre a été ajouté avec succès.'
    };
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const editStaff = async (id, staff, token) => {
  try {
    staff.email = staff.email.replace(' ', '');
    const {data} = await axios.put(apiUrl + 'staff/' + id, staff, authConfig(token));

    if (!data.success) return data?.error;

    return {
      success: true,
      title: staff.firstName + ' ' + staff.lastName,
      desc: data?.data,
    };

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const deleteStaff = async (staff, token) => {
  try {
    staff.email = staff.email.replace(' ', '');
    const {data} = await axios.delete(apiUrl + 'staff/' + staff._id, authConfig(token));

    if (!data.success) return data?.error;

    return {
      success: true,
      title: staff.firstName + ' ' + staff.lastName,
      desc: data?.data,
    };

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
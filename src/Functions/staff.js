import axios from 'axios';

import { apiUrl } from '../../config';


export const getStaff = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const {data} = await axios.get(apiUrl + 'admin/accounts/staff', config);

    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const registerStaff = async (staff, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  
  try {
    const {data} = await axios.post(apiUrl + 'admin/accounts/register', staff, config);

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: 'Création de compte',
      desc: 'Votre nouveau membre a été ajouté avec succès.'
    };
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const editStaff = async (id, staff, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    staff.email = staff.email.replace(' ', '');
    const {data} = await axios.put(apiUrl + 'admin/accounts/update/' + id, staff, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: staff.firstName + ' ' + staff.lastName,
      desc: data?.data,
    };

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const deleteStaff = async (staff, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    staff.email = staff.email.replace(' ', '');
    const {data} = await axios.delete(apiUrl + 'admin/accounts/delete/' + staff._id, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: staff.firstName + ' ' + staff.lastName,
      desc: data?.data,
    };

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
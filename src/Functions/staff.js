import axios from 'axios';

import { authConfig } from './utils';
import { apiUrl } from '../../config';


export const getStaff = async () => {
  try {
    const config = await authConfig();
    const {data} = await axios.get(apiUrl + 'staff', config);

    if (!data.success) return data?.error;

    return data;
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const createStaff = async (staff) => {
  try {
    staff.email = staff.email.replace(' ', '');

    const config = await authConfig();
    const {data} = await axios.post(apiUrl + 'staff', staff, config);

    if (!data.success) return data?.error;
    
    return {
      success: true,
      title: 'Création de compte',
      desc: 'Votre nouveau membre a été ajouté avec succès.'
    };
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const editStaff = async (id, staff) => {
  try {
    staff.email = staff.email.replace(' ', '');

    const config = await authConfig();
    const {data} = await axios.put(apiUrl + 'staff/' + id, staff, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: staff.firstName + ' ' + staff.lastName,
      desc: data?.data,
    };

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const deleteStaff = async (staff) => {
  try {
    staff.email = staff.email.replace(' ', '');
    
    const config = await authConfig();
    const {data} = await axios.delete(apiUrl + 'staff/' + staff._id, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: staff.firstName + ' ' + staff.lastName,
      desc: data?.data,
    };

  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
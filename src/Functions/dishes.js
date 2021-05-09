import axios from 'axios';

import { apiUrl } from '../../config';


export const getDishes = async (type = null) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const {data} = await axios.get(apiUrl + 'dishes', config);

    if (!data.success) return data?.error;

    let tmpDishes, newDishes = [];
    tmpDishes = data.dishes;

    if (tmpDishes) tmpDishes.forEach((dish, i) => dish.key = i);
    tmpDishes.forEach(dish => {
      if (dish.type === type || type === null) newDishes.push(dish);
    });

    return {success: true, dishes: newDishes};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const createDish = async (dish, token) => {
  for (const [key, value] of Object.entries(dish)) {
    if (value === '' && key !== 'detail')
      return 'Veuillez remplir tous les champs nécessaires.';
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  

  try {
    const {data} = await axios.post(apiUrl + 'dishes/create', dish, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Création réussie',
      desc: 'Votre nouveau plat est prêt.'
    };
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const editDish = async (token, id, dish) => {
  for (const [key, value] of Object.entries(dish)) {
    if (value === '' && key !== 'detail')
      return 'Veuillez remplir tous les champs nécessaires.';
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  try {
    const {data} = await axios.put(apiUrl + 'dishes/update/' + id, dish, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: dish.name,
      desc: 'Votre plat a été modifié avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const deleteDish = async (token, id, dish) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  try {
    const {data} = await axios.delete(apiUrl + 'dishes/delete/' + id, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: dish.name,
      desc: 'Votre plat a été supprimé avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};
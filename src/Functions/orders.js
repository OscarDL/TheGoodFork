import axios from 'axios';

import { authConfig } from './utils';
import { apiUrl } from '../../config';


export const getOrders = async (user) => {
  try {
    const config = await authConfig();
    const {data} = await axios.get(apiUrl + 'orders', config);

    if (!data.success) return data?.error;

    let newOrders = []; // Return non validated orders to waiters only
    data.orders?.map(order => order.validated === false && newOrders.push(order));

    return {success: true, orders: user.type === 'waiter' ? newOrders : data.orders};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const getOrder = async (id) => {
  try {
    const config = await authConfig();
    const {data} = await axios.get(apiUrl + 'orders/' + id, config);

    if (!data.success) return data?.error;

    return {success: true, order: data.order};
    
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const validateOrder = async (order) => {
  try {
    order.validated = true;

    const config = await authConfig();
    const {data} = await axios.put(apiUrl + 'orders/' + order._id, order, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Validation',
      desc: 'Commande validée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const submitOrder = async (order, email) => {
  try {
    order.orderedBy = email;
    order.price = totalPrice(order); // For security

    const config = await authConfig();
    const {data} = await axios.post(apiUrl + 'orders', order, config);
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Nouvelle commande',
      desc: 'Commande envoyée avec succès.',

      order: data.order
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const editOrder = async (order) => {
  try {
    order.price = totalPrice(order); // For security

    const config = await authConfig();
    const {data} = await axios.put(apiUrl + 'orders/' + order._id, order, config);
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Modification',
      desc: 'Commande modifiée avec succès.',

      order: data.order
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const cancelOrder = async (order) => {
  try {
    const config = await authConfig();
    const {data} = await axios.delete(apiUrl + 'orders/' + order._id, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: 'Annulation',
      desc: 'Commande anulée avec succès.'
    }
  } catch (error) { return error.response?.data.error || 'Erreur inconnue.'; }
};


export const addToOrder = (order, type, item, num, setPrice) => {
  if (item.stock === 0) return order;
  
  let index;
  let exists = false;
  
  order[type].map((dish, i) => {
    if(dish._id === item._id) {
      exists = true;
      return index = i;
    }
  });
  
  if (exists || num === -1) {

    if (num === -1 && order[type][index].quantity === 1) // remote dish from array in dish-type object
      order[type].splice(index, 1);
    else
      order[type][index].quantity += num;

  } else order[type].push({
    _id: item._id,
    name: item.name,
    status: 'pending',
    quantity: 1,
    price: item.price
  });

  order.price = totalPrice(order);
  setPrice(order.price);

  return order;
};


export const totalPrice = (order) => {
  let total = 0;
  
  order.appetizer.map(it => total += it.price * it.quantity);
  order.mainDish.map(it => total += it.price * it.quantity);
  order.dessert.map(it => total += it.price * it.quantity);
  order.drink.map(it => total += it.price * it.quantity);
  order.alcohol.map(it => total += it.price * it.quantity);
  
  return total;
};
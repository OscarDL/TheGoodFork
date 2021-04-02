import axios from 'axios';

import { apiUrl } from '../../config';


export const getOrders = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const {data} = await axios.get(apiUrl + 'orders', config);

    if (!data.success) return data?.error;

    let newOrders = [];
    data.orders?.map(order => order.validated === false && newOrders.push(order));

    return {success: true, orders: newOrders};
    
  } catch (error) { return error.response?.data.error || "Unknown error."; }
};


export const addToOrder = (content, item, num) => {
  let index;
  let exists = false;
  
  content.map((dish, i) => {
    if(dish._id === item._id) {
      exists = true;
      return index = i;
    }
  });
  
  if (exists || num === -1) {
    let newContent = content;
    
    if (num === -1 && newContent.find(found => found._id === item._id) === undefined)
      return [];
    else if (num === -1 && newContent[index].quantity === 1)
      newContent.splice(index);
    else newContent[index].quantity += num;

    return newContent;
  }

  return content.concat({
    _id: item._id,
    name: item.name,
    status: 'pending',
    quantity: 1,
    price: item.price
  });
}


export const validateOrder = async (order, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    order.validated = true;
    const {data} = await axios.put(apiUrl + 'orders/edit/' + order._id, order, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: "Order validation",
      desc: "Successfully validated this order."
    }
  } catch (error) { return error.response?.data.error || "Unknown error."; }
}


export const deleteOrder = async (order, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const {data} = await axios.delete(apiUrl + 'orders/delete/' + order._id, config);

    if (!data.success) return data?.error;

    return {
      success: true,
      title: "Order deletion",
      desc: "Successfully deleted this order."
    }
  } catch (error) { return error.response?.data.error || "Unknown error."; }
}


export const submitOrder = async (order, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    order.price = totalPrice(order);
    const {data} = await axios.post(apiUrl + 'orders/create', order, config);
    
    if (!data.success) return data?.error;

    return {
      success: true,
      title: "Order successsful",
      desc: "Your order was submitted successfully."
    }
  } catch (error) { return error.response?.data.error || "Unknown error."; }
};


export const totalPrice = ({appetizer, mainDish, dessert, drink, alcohol}) => {
  let total = 0;
  
  appetizer?.map(it => total += it.price * it.quantity);
  mainDish?.map(it => total += it.price * it.quantity);
  dessert?.map(it => total += it.price * it.quantity);
  drink?.map(it => total += it.price * it.quantity);
  alcohol?.map(it => total += it.price * it.quantity);
  
  return Number(total.toFixed(2));
}
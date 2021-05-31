import { getItemAsync } from 'expo-secure-store';

export const authConfig = async (token = null) => {
  if (!token) token = await getItemAsync('authToken');

  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
};

export const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};


export const formatGrid = (data, numCol) => {
  const numFullRows = Math.floor(data.length / numCol);

  let lastRowCount = data.length - (numFullRows * numCol);
  while (lastRowCount !== numCol && lastRowCount !== 0) {
    data.push({key: 'blank-' + String(lastRowCount), name: 'zzz', empty: true});
    lastRowCount += 1;
  }

  return data.sort((a, b) => a.name > b.name ? 1 : -1);
};

export const matchesOrder = (order, search) => (
  order.user.firstName.toLowerCase().includes(search.toLowerCase())
    ||
  order.user.lastName.toLowerCase().includes(search.toLowerCase())
    ||
  (order.user.firstName.toLowerCase() + ' ' + order.user.lastName.toLowerCase()).includes(search.toLowerCase())
);


export const getPeriod = (period) => {
  if (period === 1) return 'matin';
  if (period === 2) return 'midi';
  if (period === 3) return 'après-midi';
  if (period === 4) return 'soir';
};


export const truncPrice = (price) => Number(price).toFixed(2);
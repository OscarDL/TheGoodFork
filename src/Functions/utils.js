export const formatGrid = (data, numCol) => {
  const numFullRows = Math.floor(data.length / numCol);

  let lastRowCount = data.length - (numFullRows * numCol);
  while (lastRowCount !== numCol && lastRowCount !== 0) {
    data.push({key: 'blank-' + lastRowCount.toString(), name: 'zzz', empty: true});
    lastRowCount += 1;
  }

  return data.sort((a, b) => a.name > b.name ? 1 : -1);
}

export const matchesOrder = (order, search) => (
  order.user.firstName.toLowerCase().includes(search.toLowerCase())
    ||
  order.user.lastName.toLowerCase().includes(search.toLowerCase())
    ||
  (order.user.firstName.toLowerCase() + ' ' + order.user.lastName.toLowerCase()).includes(search.toLowerCase())
);
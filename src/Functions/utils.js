export const formatGrid = (data, numCol) => {
  const numFullRows = Math.floor(data.length / numCol);

  lastRowCount = data.length - (numFullRows * numCol);
  while (lastRowCount !== numCol && lastRowCount !== 0) {
    data.push({key: 'blank-' + lastRowCount, name: 'zzz', empty: true});
    lastRowCount += 1;
  }

  return data.sort((a, b) => a.name > b.name ? 1 : -1);
}
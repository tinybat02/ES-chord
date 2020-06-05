import { SingleElement } from '../types';
export const processData = (data: SingleElement[]) => {
  if (data.length == 0) {
    return { matrix: null, keys: null };
  }

  const stores1 = data.map(elm => elm.Source);
  const stores2 = Object.keys(data[0]).filter(elm => !['_id', '_type', '_index', 'timestamp', 'Source'].includes(elm));
  const storesList = [...new Set([...stores1, ...stores2])];

  const indexStore: { [key: string]: number } = {};
  storesList.map(store => (indexStore[store] = storesList.indexOf(store)));

  const matrix = [...Array(storesList.length)].map(e => Array(storesList.length).fill(0));

  data.map(elm => {
    const row = indexStore[elm.Source];
    storesList.map(store => {
      matrix[row][indexStore[store]] += elm[store];
      if (elm[store] > 0) {
        matrix[indexStore[store]][row] += elm[store] - 1;
      }
    });
  });

  return { matrix, keys: storesList };
};

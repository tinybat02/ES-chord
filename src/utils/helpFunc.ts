import { SingleElement } from '../types';
export const processData = (data: SingleElement[]) => {
  console.log('data ', data);

  if (data.length == 0) {
    return { matrix: null, keys: null };
  }

  const storesList = [...new Set(data.map(elm => elm.Source))];

  const columnStoresLength = Object.keys(data[0]).length - 5;
  if (storesList.length !== columnStoresLength) {
    console.log('stop ', columnStoresLength);
    return { matrix: null, keys: null };
  }

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

  console.log('matrix ', matrix);
  console.log('keys ', storesList);
  return { matrix, keys: storesList };
};

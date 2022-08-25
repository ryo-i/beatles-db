import { keyNumbers } from './keyNumbers';


// Get Filter Data
const getFilterData = (data, key, value, match) => {
  const isExact = match === 'exact';
  const isPartial = match === 'partial';
  const isSeach = match === 'search';

  const result = data.filter((item, index) => {
    if (isExact && item[keyNumbers[key]] === value) {
      return item;
    } else if (isPartial && item[keyNumbers[key]].indexOf(value) !== -1) {
      return item;
    } else if (isSeach) {
      for (let i = 0; i < item.length; i++) {
        const isMatch = item[i].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        if (isMatch) {
          return item;
        }
      }
    }
  });
  return result;
};

export { getFilterData };
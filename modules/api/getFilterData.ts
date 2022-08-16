import { keyNumbers } from './keyNumbers';


// Get Filter Data
const getFilterData = (data, key, value, match) => {
  const iseEact = match === 'exact';
  const isPartial = match === 'partial';

  const result = data.filter((item, index) => {
    if (iseEact && item[keyNumbers[key]] === value) {
      return item;
    } else if (isPartial && item[keyNumbers[key]].indexOf(value) !== -1) {
      return item;
    }
  });
  return result;
};

export { getFilterData };
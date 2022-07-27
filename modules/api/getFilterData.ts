// Get Filter Data
const getFilterData = (data, keyNumbers, key, value) => {
  const result = data.filter((item, index) => {
    if (item[keyNumbers[key]] === value) {
      return item;
    }
  });
  return result;
};

export { getFilterData };
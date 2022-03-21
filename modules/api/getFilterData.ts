// Get Filter Data
const getFilterData = (data, keyNumbers, key, value) => {
    const result = data.filter((item, index) => {
      if (item[keyNumbers[key]] == value) return index;
    });
    return result;
};

export { getFilterData };
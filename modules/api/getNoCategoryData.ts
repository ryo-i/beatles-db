// Get Filter Data
const getNoCategoryData = (data, keyNumbers) => {
  const result = data.filter((item, index) => {
    if (item[keyNumbers['id']] !== 'id') {
      return item;
    }
  });
  return result;
};

export { getNoCategoryData };
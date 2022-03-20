// Get Category Data
const getCategoryData = (beatlesData, keyNumbers, categoryPath) => {
    const result = beatlesData.values.filter((item, index) => {
      if (item[keyNumbers.path] == categoryPath) return index;
    });
    return result;
};

export { getCategoryData };
const getTagList = (yearList, currentYear) => {
  let result = [];
  for (let i = 0; i < yearList.length; i++) {
    if (yearList[i] === String(currentYear)) {
      result.push('currentTag');
    } else {
      result.push('');
    }
  }

  return result;
};

export { getTagList };
// Get Years Array
const getYearsArray = (data, keyNumbers) => {
  const years = ['1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970'];
  let allYearsArray = [];
  let resultYearsArray = [];
  // console.log('keyNumbers', keyNumbers);

  for (let i = 0; i < data.length; i++) {
    const thisYear = data[i][keyNumbers.year];
    allYearsArray.push(thisYear);
  }
  // console.log('allYears', allYears);

  for (let i = 0; i < years.length; i++) {
    const isYears = allYearsArray.includes(years[i]);
    if (isYears) {
      resultYearsArray.push(years[i]);
    }
  }
  // console.log('resultYears', resultYearsArray);

  return resultYearsArray;
};

export { getYearsArray };
// Get Formats Array
const getFormatsArray = (data, keyNumbers) => {
  const formats = ['Single', 'Album', 'EP'];
  let allFormatsArray = [];
  let resultFormatsArray = [];
  // console.log('keyNumbers', keyNumbers);

  for (let i = 0; i < data.length; i++) {
    const thisFormat = data[i][keyNumbers.format];
    allFormatsArray.push(thisFormat);
  }
  // console.log('allFormatsArray', allFormatsArray);

  for (let i = 0; i < formats.length; i++) {
    const isYears = allFormatsArray.includes(formats[i]);
    if (isYears) {
      resultFormatsArray.push(formats[i]);
    }
  }
  // console.log('resultFormatsArray', resultFormatsArray);

  return resultFormatsArray;
};

export { getFormatsArray };
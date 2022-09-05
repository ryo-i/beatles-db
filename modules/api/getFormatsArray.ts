// Get Formats Array
const getFormatsArray = (data, keyNumbers) => {
  const formats = ['Single', 'Album', 'EP'];
  let allFormatsArray = [];
  let resultFormatsArray = [];

  for (let i = 0; i < data.length; i++) {
    const thisFormat = data[i][keyNumbers.format];
    allFormatsArray.push(thisFormat);
  }

  for (let i = 0; i < formats.length; i++) {
    const isYears = allFormatsArray.includes(formats[i]);
    if (isYears) {
      resultFormatsArray.push(formats[i]);
    }
  }

  return resultFormatsArray;
};

export { getFormatsArray };
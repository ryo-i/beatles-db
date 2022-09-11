// Get Divided Array
const getDividedArray = (text) => {
    let resultArray = [];
    const delimiterSlash = ' / ';
    const isMultipleSlash = text.indexOf(delimiterSlash) !== -1;

    if (isMultipleSlash) {
      resultArray = text.split(delimiterSlash).map((item) => {
        return item;
      });
    } else {
      resultArray.push(text);
    }

    return resultArray;
  };

  export { getDividedArray };
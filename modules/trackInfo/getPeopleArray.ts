// Get People Array
const getPeopleArray = (props) => {
    let resultArray = [];
    const delimiterSlash = ' / ';
    const delimiterColon = ' : ';
    const delimiterComma = ', ';
    const isMultipleColon = props.name.indexOf(delimiterColon) !== -1;

    const peapleSplit = (resultArray) => {
      let peapleSplitArray = resultArray[0].split(delimiterComma);
      resultArray[0] = peapleSplitArray;
      return resultArray;
    };

    resultArray = props.name.split(delimiterSlash).map((item) => {
      if (isMultipleColon) {
        let resultArray = item.split(delimiterColon);
        const isMultipleComma = resultArray[0].indexOf(delimiterComma) !== -1;
        if (isMultipleComma) {
          peapleSplit(resultArray);
        }
        return resultArray;
      } else {
        return item;
      }
    });

    return resultArray;
  };

  export { getPeopleArray };
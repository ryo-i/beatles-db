// Get Tracks Array
const getTracksArray = (dataLength, pageInfo, data, keyNumbers) => {
    let startNum = dataLength -1;
    console.log('dataLength', dataLength);
    console.log('startNum', startNum);
    console.log('pageInfo', pageInfo);
    console.log('keyNumbers', keyNumbers);

    let addLength = 50;
    if ((startNum + addLength) > pageInfo.trackLength) {
      addLength = pageInfo.trackRemainder;
    }

    console.log('startNum + addLength', startNum + addLength);
    console.log('addLength', addLength);

    const tracksArray = [];
    for (var i = startNum; i < startNum + addLength; i++) {
      const thisObj = {};
      thisObj['id'] = data[i][keyNumbers.id];
      thisObj['year'] = data[i][keyNumbers.year];
      thisObj['icon'] = data[i][keyNumbers.icon];
      thisObj['path'] = data[i][keyNumbers.path];
      thisObj['artist'] = data[i][keyNumbers.artist];
      thisObj['format'] = data[i][keyNumbers.format];
      thisObj['title'] = data[i][keyNumbers.title];
      thisObj['order'] = data[i][keyNumbers.order];
      thisObj['number'] = data[i][keyNumbers.number];
      thisObj['track'] = data[i][keyNumbers.track];
      tracksArray.push(thisObj);
    }
    return tracksArray;
  };

  export { getTracksArray };
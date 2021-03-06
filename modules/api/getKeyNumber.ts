// Get Key Numbers
const getKeyNumber = (data, keyNumbers) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 'id') {
        keyNumbers.id = i;
      } else if (data[i] === 'year') {
        keyNumbers.year = i;
      } else if (data[i] === 'icon') {
        keyNumbers.icon = i;
      } else if (data[i] === 'path') {
        keyNumbers.path = i;
      } else if (data[i] === 'artist') {
        keyNumbers.artist = i;
      } else if (data[i] === 'format') {
        keyNumbers.format = i;
      } else if (data[i] === 'title') {
        keyNumbers.title = i;
      } else if (data[i] === 'order') {
        keyNumbers.order = i;
      } else if (data[i] === 'number') {
        keyNumbers.number = i;
      } else if (data[i] === 'track') {
        keyNumbers.track = i;
      }
    }
  }

  export { getKeyNumber };
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
    } else if (data[i] === 'original') {
      keyNumbers.original = i;
    } else if (data[i] === 'songwriter') {
      keyNumbers.songwriter = i;
    } else if (data[i] === 'vocal') {
      keyNumbers.vocal = i;
    } else if (data[i] === 'playing') {
      keyNumbers.playing = i;
    } else if (data[i] === 'musician') {
      keyNumbers.musician = i;
    } else if (data[i] === 'producer') {
      keyNumbers.producer = i;
    } else if (data[i] === 'engineer') {
      keyNumbers.engineer = i;
    } else if (data[i] === 'artwork') {
      keyNumbers.artwork = i;
    } else if (data[i] === 'film') {
      keyNumbers.film = i;
    } else if (data[i] === 'mv') {
      keyNumbers.mv = i;
    } else if (data[i] === 'format') {
      keyNumbers.format = i;
    } else if (data[i] === 'title') {
      keyNumbers.title = i;
    } else if (data[i] === 'date') {
      keyNumbers.date = i;
    } else if (data[i] === 'label') {
      keyNumbers.label = i;
    } else if (data[i] === 'country') {
      keyNumbers.country = i;
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
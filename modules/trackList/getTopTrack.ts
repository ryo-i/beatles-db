  // Get Top Track
  const getTopTrack = (thisOrder, index, tracksData) => {
    const beforeIndex =  index - 1;
    const beforeOrder = beforeIndex >= 0 ? tracksData[index - 1].order : null;

    if (thisOrder !== beforeOrder) {
      return 'topTrack';
    } else {
      return '';
    }
  }

  export { getTopTrack };
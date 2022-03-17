  // Get Top Track
  const getTopTrack = (thisOrder, index, tracksData) => {
    const beforeIndex =  index - 1;
    const beforeOrder = beforeIndex >= 0 ? tracksData[index - 1].order : null;
    // console.log('beforeOrder', beforeIndex, beforeOrder);
    // console.log('thisOrder', index, thisOrder);
    if (thisOrder !== beforeOrder) {
      return 'topTrack';
    } else {
      return '';
    }
  }

  export { getTopTrack };
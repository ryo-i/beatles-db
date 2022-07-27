// getDataLength
const getDataLength = (pageParam) => {
  if (!pageParam || isNaN(pageParam || pageParam === 1)) {
    return 1;
  } else {
    return ((pageParam - 1) * 50) + 1;
  }
}

export { getDataLength };
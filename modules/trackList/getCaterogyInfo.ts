// Get Category Info
const getCaterogyInfo = (category) => {
  const categoryInfo = {
    path: '',
    name: ''
  };

  if (category === 'beatles') {
    categoryInfo.path = 'beatles';
    categoryInfo.name = 'Beatles';
  } else if (category === 'john-yoko') {
    categoryInfo.path = 'john-yoko';
    categoryInfo.name = 'John & Yoko';
  } else if (category === 'paul') {
    categoryInfo.path = 'paul';
    categoryInfo.name = 'Paul McCartney';
  } else if (category === 'george') {
    categoryInfo.path = 'george';
    categoryInfo.name = 'George Harrison';
  } else if (category === 'ringo') {
    categoryInfo.path = 'ringo';
    categoryInfo.name = 'Ringo Starr';
  } else if (category === 'tony-beatles') {
    categoryInfo.path = 'tony-beatles';
    categoryInfo.name = 'Tony & Beatles';
  }

  return categoryInfo;
}

export { getCaterogyInfo };
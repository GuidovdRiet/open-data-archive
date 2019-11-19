const setAllObjectValuesSortMinusOne = object => {
  const dataSorted = Object.keys(object).reduce((allSortData, current) => {
    const sortedData = allSortData;
    sortedData[current] = -1;
    return sortedData;
  }, {});
  return dataSorted;
};

module.exports = setAllObjectValuesSortMinusOne;

const filterUndefinedFromObject = obj =>
  Object.keys(obj).reduce((current, key) => {
    const result = current;
    if (obj[key] !== undefined) result[key] = obj[key];
    return result;
  }, {});

module.exports = filterUndefinedFromObject;

export const checkIfEmpty = (obj) => {
  if (obj && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

export const setAllObjectProperties = (obj, value) => {
  const newObj = Object.keys(obj).reduce((acc, cur) => {
    acc[cur] = value;
    return acc;
  }, {});
  return newObj;
};
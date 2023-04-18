const flattenByProp = (arr, prop) => {
  let cloneArr = [...arr];
  const res = [];

  while (cloneArr.length > 0) {
    const item = cloneArr.shift();
    res.push(item);
    if (item[prop]) {
      cloneArr = [...item[prop], ...cloneArr];
    }
  }
  return res;
};

const utils = {
  flattenByProp,
};
export default utils;

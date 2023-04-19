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

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  if (!base64Url) return null;
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const objectWithoutProperties = (obj, keys) => {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

const utils = {
  flattenByProp,
  parseJwt,
  objectWithoutProperties,
};
export default utils;

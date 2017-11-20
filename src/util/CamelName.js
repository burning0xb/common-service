'use strict';
const trasCamel = function(str) {
  const array = str.split('_');
  let finalRes = '';
  array.map(function(key) {
    let tmpStr = key.toLowerCase();
    finalRes += (tmpStr.substr(0, 1).toUpperCase() + tmpStr.substr(1, tmpStr.length - 1));
  });
  // console.log(finalRes);
  return finalRes;
}

exports.trasCamel = trasCamel;

'use strict'

const arrayContain = function(array, value) {
  let flag = false;
  array.map((key) => {
    if (key === value) {
      flag = true;
      return false;
    }
  });
  return flag;
}

exports.arrayContain = arrayContain;

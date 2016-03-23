'use strict';
var toCamelCase = require('to-camel-case');

const corners = ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'];

module.exports = function (keys) {
  // TODO border-radius can look like: 
    // border-radius: 10px 5% / 20px 30px;
  var values = keys[0].value.split('/')[0].split(' ');

  // uppercase the keys to make this code easier to write
  var property = toCamelCase(keys[0].key);
  var length = values.length;

  // if there's only one value then all is well
  if (length === 1) {
    return keys;
  }

  keys = [];

  if (property !== 'borderRadius') {
    // React Native only supports one value, css allows for two
    keys.push({
      key: property,
      value: values[0]
    });
  } else {
    /* top-left-and-bottom-right | top-right-and-bottom-left */
    if (length === 2) {
      [corners[0], corners[2]].forEach(function (prop) {
        keys.push({
          key: `border${prop}Radius`,
          value: values[0]
        });
      });
      [corners[1], corners[3]].forEach(function (prop) {
        keys.push({
          key: `border${prop}Radius`,
          value: values[1]
        });
      });
    }
    
    /* top-left | top-right-and-bottom-left | bottom-right */
    else if (length === 3) {
      keys.push({
        key: `border${corners[0]}Radius`,
        value: values[0]
      });
      [corners[1], corners[4]].forEach(function (prop) {
        keys.push({
          key: `border${prop}Radius`,
          value: values[1]
        });
      });
      keys.push({
        key: `border${corners[3]}Radius`,
        value: values[2]
      });
    }
    
    /* top-left | top-right | bottom-right | bottom-left */
    else if (length === 4) {
      corners.forEach(function (prop, index) {
        keys.push({
          key: `border${prop}Radius`,
          value: values[index]
        });
      });
    }
  }

  return keys;
};

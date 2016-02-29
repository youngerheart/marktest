"use strict"

const should = require('should');

const getCurrent = (obj, params) => {
  if(!params) params = {};
  for(let key in obj) {
    if(Array.isArray(obj[key])) {
      params[key] = [{}];
      getCurrent(obj[key][0], params[key][0]);
      continue;
    }
    if(typeof obj[key] === 'function') {
      params[key] = obj(Date.now());
      continue;
    }
    if(typeof obj[key] !== 'object') {
      params[key] = null;
      continue;
    }
    if(!obj[key].default && !obj[key].options) {
      params[key] = {};
      getCurrent(obj[key], params[key]);
      continue;
    }
    if(!obj[key].default) {
      params[key] = null;
      continue;
    } else params[key] = typeof obj[key].default === 'function' ? obj[key].default(Date.now()) : obj[key].default;
  }
  return params;
};

const getParamsArr = (params, req) => {

};

module.exports = (req) => {
  if(!req) return [{}];
  var params = getCurrent(req);
  var result = getParamsArr(params, req);
  return [{}];
};

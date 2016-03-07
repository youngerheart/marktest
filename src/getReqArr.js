"use strict"

const typePoint = {
  string: String,
  number: Number,
  boolean: Boolean
};

const getCurrent = (obj, params, routeArr, routes) => {
  if(!params) params = {};
  if(!routeArr) routeArr = [];
  if(!routes) routes = [];
  for(let key in obj) {
    if(Array.isArray(obj[key])) {
      routeArr.push(key, 0);
      params[key] = [{}];
      getCurrent(obj[key][0], params[key][0], routeArr, routes);
      routeArr.splice(routeArr.length - 2, 2);
      continue;
    }
    if(typeof obj[key] !== 'object') {
      params[key] = null;
      continue;
    }
    if(!obj[key]._type && !obj[key]._value && !obj[key]._options) {
      params[key] = {};
      routeArr.push(key);
      getCurrent(obj[key], params[key], routeArr, routes);
      continue;
    }
    if(obj[key]._type === 'undefined' ||
      (!obj[key]._type && typeof obj[key]._value === 'undefined')) {
      params[key] = null;
      continue;
    } else {
      routeArr.push(key);
      routes.push(clone(routeArr));
      routeArr.pop();
      params[key] = typeof obj[key]._value === 'undefined' ? typePoint[obj[key]._type](Math.random()) : obj[key]._value;
    }
  }
  return [params, routes];
};

const clone = (obj, desc) => {
  var obj = JSON.parse(JSON.stringify(obj));
  if(desc) obj.desc = desc;
  return obj
};

const getParamsArr = (obj, params, routes) => {
  var resArr = [];
  var objItem, paramsItem;
  routes.forEach((route) => {
    var getPoint = (objItem, paramsItem, index) => {
      if(!index) index = 0;
      if(route.length - index > 1) return getPoint(objItem[route[index]], paramsItem[route[index]], ++index);
      return [objItem, paramsItem];
    };
    var pointers = getPoint(obj, params);
    for(let key in pointers[0]) {
      let value = pointers[1][key];
      let thatType = typeof value;
      if (!pointers[0][key]._options) continue;
      pointers[0][key]._options.forEach((option) => {
        switch(option) {
          case 'required':
            delete pointers[1][key];
            resArr.push(clone(params, 'required of ' + key));
            pointers[1][key] = value;
            break;
          case 'type':
            for(let type in typePoint) {
              if(thatType === type) continue;
              pointers[1][key] = typePoint[type](Math.random());
              resArr.push(clone(params, 'type of ' + key));
              pointers[1][key] = value;
            }
            break;
          case 'unique':
            pointers[1][key] = typePoint[thatType](Math.random());
            resArr.push(clone(params, 'unique of ' + key), clone(params, 'unique of ' + key));
            pointers[1][key] = value;
            break;
        }
      });
    }
  });
  resArr.push(clone(params));
  return resArr;
};

module.exports = (req) => {
  if(!req) return [{}];
  var current = getCurrent(req);
  return getParamsArr(req, current[0], current[1]);
};

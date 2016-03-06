"use strict"

const should = require('should');
const paramsParser = require('./paramsParser');

const checkCode = (code, statusCode) => {
  if(Array.isArray(code)) should(code).containEql(statusCode);
  else should(code).equal(statusCode);
};

module.exports = (test, res, body, desc) => {
  if(test.code && !desc) checkCode(test.code, res.statusCode);
  if(test.testCode && desc) checkCode(test.testCode, res.statusCode);
  var walk = (body, resObj) => {
    if(Array.isArray(body)) resObj.forEach((res) => walk(body[0], res));
    for(let key in body) {
      if(Array.isArray(body[key])) resObj[key].forEach((res) => walk(body[key][0], res));
      should(body[key]).be.type('object');
      if(!body[key]._type && !body[key]._value && !body[key]._options) walk(body[key], resObj[key]);
      if(body[key]._options) body[key]._options.forEach((option) => {
        switch(option) {
          case 'required':
            should(resObj).have.property(key);
            break;
          case 'unique':
            if(!body.uniArr) body.uniArr = [];
            if(!resObj[key]) break;
            should(body.uniArr.indexOf(resObj[key])).equal(-1);
            body.uniArr.push(resObj[key]);
            break;
          case 'type':
            var type = body[key]._type || typeof body[key]._value;
            should(type).equal(typeof resObj[key]);
            break;
          case 'value':
            if(body[key]._value) should(resObj[key]).equal(body[key]._value);
            break;
        }
      });
    }
  };
  if(test.body) walk(test.body, JSON.parse(body));
  if(test.save) {
    var str;
    for(let key in test.save) {
      if(paramsParser.fetch(JSON.parse(body), test.save[key], key)) str = `saved ${test.save[key]} as ${key} success`;
      else str = `saved ${test.save[key]} as ${key} failed`;
      console.log('\x1b[36m', str ,'\x1b[0m');
    }
  }
};

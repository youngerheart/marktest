"use strict"

const should = require('should');

const checkCode = (code, statusCode) => {
  if(Array.isArray(code)) code.should.containEql(statusCode);
  else code.should.equal(statusCode);
};

module.exports = (test, res, body, desc) => {
  if(!test) return;
  if(test.code && !desc) checkCode(test.code, res.statusCode);
  if(test.testCode && desc) checkCode(test.testCode, res.statusCode);
  var walk = (body, resObj) => {
    if(Array.isArray(body)) resObj.forEach((res) => walk(body[0], res));
    for(let key in body) {
      if(Array.isArray(body[key])) resObj[key].forEach((res) => walk(body[key][0], res));
      if(typeof body[key] !== 'object') return;
      if(!body[key].default && !body[key].options) walk(body[key], resObj[key]);
      if(!body[key].default || !body[key].options) return;
      body[key].options.forEach((option) => {
        switch(option) {
          case 'required':
            resObj.should.have.property(key);
            break;
          case 'unique':
            if(!body.uniArr) body.uniArr = [];
            if(!resObj[key]) break;
            body.uniArr.indexOf(resObj[key]).should.equal(-1);
            body.uniArr.push(resObj[key]);
            break;
          case 'type':
            var type = typeof body[key].default === 'function' ? typeof body[key].default() : typeof body[key].default;
            type.should.equal(typeof resObj[key]);
            break;
          case 'value':
            if(resObj[key] &&
              typeof body[key].default !== 'function' &&
              typeof body[key].default !== 'object') resObj[key].should.equal(body[key].default);
            break;
        }
      });
    }
  };
  if(test.body) walk(test.body, JSON.parse(body));
};

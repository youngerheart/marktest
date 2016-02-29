"use strict"

const should = require('should');
module.exports = (test, res) => {
  var resObj = {};
  var body = {};
  if(test.code) res.status.should.equal(test.code);
  resObj = res.body;
  if(typeof test.body === 'object') body = test.body;
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
  walk(body, resObj);
};

"use strict"

const request = require('superagent');
const should = require('should');

const getReqArr = require('./getReqArr');
const getUrl = require('./getUrl');
const checkRes = require('./checkRes');

const objs = require('./../example');
if(!objs.init || !objs.init.host) throw 'Error: can\'t find host';

const host = objs.init.host;

const test = (key, testArr) => {
  describe(key, () => {
    testArr.forEach((test, index) => {
      if(!test.it) throw `Error: can\'t find describe about ${key} index ${index}`;
      it(test.it, (done) => {
        should.exist(test.url);
        let url = getUrl(test.url, test.req);
        let reqArr = getReqArr(test.req);
        reqArr.forEach((params) => {
          request[test.method || 'get'](host + url).query(params).end((err, res) => {
            should.exist(res);
            if(test.res) checkRes(test.res, res);
            done();
          });
        });
      });
    });
  });
};

delete objs.init;

for(let key in objs) test(key, objs[key]);

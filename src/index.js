"use strict"
var querystring = require('querystring');
const request = require('request').defaults({jar: true});
const should = require('should');

const getReqArr = require('./getReqArr');
const checkRes = require('./checkRes');
const paramsParser = require('./paramsParser');

const objs = require('./../example');
if(!objs.init || !objs.init.host) throw 'Error: can\'t find initial info';
if(objs.params) paramsParser.init(objs.params);

const host = objs.init.host;

const test = (key, testArr) => {
  describe(key, () => {
    testArr.forEach((test, index) => {
      if(test.disabled) return it(`disabled ${test.desc}`, (done) => done());
      if(!test.desc) throw `Error: can\'t find describe about ${key} index ${index}`;
      describe(test.desc, () => {
        should.exist(test.url);
        let url = paramsParser.url(test.url, test.req);
        let reqArr = getReqArr(test.req);
        reqArr.forEach((params, index) => {
          it('check ' + (params.desc || 'defaults') + ' about ' + url, (done) => {
            request[test.method || 'get']({
              url: host + paramsParser.url(url),
              qs: params.query || {},
              form: params.body || {},
              headers: {
                'Content-Type': 'application/json'
              }
            }, (error, res, body) => {
              checkRes(test.res, res, body, params.desc);
              done();
            });
          });
        });
      });
    });
  });
};

delete objs.init;

for(let key in objs) test(key, objs[key]);

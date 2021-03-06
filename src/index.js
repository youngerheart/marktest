"use strict"
var querystring = require('querystring');
const request = require('request').defaults({jar: true});
const should = require('should');

const getReqArr = require('./getReqArr');
const checkRes = require('./checkRes');
const paramsParser = require('./paramsParser');

module.exports = (objs) => {
  if(!objs.init || !objs.init.host) return console.log('\x1b[36m', 'Marktest Error: can\'t find initial info' ,'\x1b[0m');
  if(objs.params) paramsParser.init(objs.params);

  const host = objs.init.host;
  const test = (key, testArr) => {
    describe(key, () => {
      testArr.forEach((test, index) => {
        if(test.disabled) return it(`disabled ${test.desc}`, (done) => done());
        if(!test.desc) return console.log(`Error: can\'t find describe about ${key} index ${index}`);
        describe(test.desc, () => {
          should(test.url).exist;
          let reqArr = getReqArr(test.req);
          reqArr.forEach((params, index) => {
            it(`check ${params.desc || 'defaults'} about ${test.method || 'get'} ${test.url}`, (done) => {
              request[test.method || 'get']({
                url: host + paramsParser.url(test.url),
                qs: params.query || {},
                form: params.body || {},
                headers: {
                  'Content-Type': 'application/json'
                }
              }, (err, res, body) => {
                should(test.res).be.type('object');
                if(body) checkRes(test.res, res, body, params.desc);
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
};


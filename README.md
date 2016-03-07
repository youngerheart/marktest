# marktest

[![NPM version](https://img.shields.io/npm/v/marktest.svg)](https://www.npmjs.com/package/marktest) [![Downloads](https://img.shields.io/npm/dm/marktest.svg)](http://badge.fury.io/js/marktest)

a simple way to test web api

![demo](https://cloud.githubusercontent.com/assets/8231964/13519913/ef6117b2-e216-11e5-930e-f51ae89250ba.gif)

## install

#### global command

```
$ sudo npm install -g marktest
$ marktest xx.json
```

#### or use require()

```
$ npm install marktest --save-dev

# index.js
const marktest = require('marktest');
const config = {...};
marktest(config);

$ mocha index.js
```

## about config

(the format about js and json, unfortunately you can't use structure function in json.)

#### check request params and response body

```
key: Number // a typeObj or current value, then test nothing.

key: {
  type: 'object',
  value: 'xx', // a true value.
  options: ['value', 'type', 'required', 'unique'] // what you want to test.
}
```

#### data structure

```
{
  init: {
    app: 'appUrl' // the app module you should require.
    params: {} // params you want to save.
    // you can use those params as '${key}', support as 'key1.key2' or 'key1[0]'.
  }
  descStr: [{
    it: itStr,
    disabled: false, // disabled this test item, default false.
    url: '/api/resume/${id}', // request url, get 'id' in init.params and res.save.
    method: 'get', // get, post, put, del, default get.
    req: {
      query: queryObj,
      body: bodyObj
    },
    res: {
      code: ...,
      body: bodyObj,
      save: ['key1', 'key2', ...], // params you want to save, support as 'key1.key2' or 'key1[0]'.
    }
  }],
  ...
}
```

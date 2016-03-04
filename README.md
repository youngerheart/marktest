# marktest
a simple way to test web api

## install

* make true you installed `mocha` command

```
$ npm install marktest --save-dev

# index.js
const marktest = require('marktest');
const config = {...};
marktest(config);

$ mocha index.js
```

## about config

#### check request params and response body

```
key: Number // a typeObj or current value, then test nothing

key: {
  default: Number // a typeObj or current value
  options: ['value', 'type', 'required', 'unique'] // what you want to test
}
```

#### data structure

```
{
  init: {
    app: 'appUrl' // the app module you should require
    params: {} // params you want to save
    // you can use those params as '${key}', support as 'key1.key2' or 'key1[0]'
  }
  descStr: [{
    it: itStr,
    disabled: false, // disabled this test item, default false.
    url: '/api/resume/${id}', // request url, get ':id' in init.params and res.save
    method: 'get', // get, post, put, del, default get
    req: {
      query: queryObj,
      body: bodyObj
    },
    res: {
      code: ...,
      body: bodyObj,
      save: ['key1', 'key2', ...], // params you want to save, support as 'key1.key2' or 'key1[0]'
    }
  }],
  ...
}
```

# marktest
a simple way to test web api

## 无非是想做这些

* 太懒了，不想一行行的写测试，所以最终要实现用一个md文档就可以跑api的测试

然而从网上并没有很贴切的对 web api 测试的标准，所以先从这几部分下手

1. session与cookie管不了了，使用者自己通过fake解决
2. 支持各种rest方法与url
3. 与各种传入参数与返回的参数可测试其require，unique，type
4. 考虑可能的需要储存变量的情况
5. 想到合适的结构来放置上述信息后就可做出对应md2obj来实现了

## 然后格式可能是这样的

* 对于传入参数与返回body的检验

```
key: Number // a typeObj or current value, then test nothing

key: {
  default: Number // a typeObj or current value
  options: ['value', 'type', 'required', 'unique'] // what you want to test
}
```

* 整体结构

```
{
  init: {
    app: 'appUrl' // the app module you should require
    params: {} // params you want to save
    // you can use those params as '${key}', support as 'key1.key2' or 'key1[0]'
  }
  descStr: [{
    it: itStr,
    url: '/api/resume/:id', // method and url, get ':id' in req.query
    method: 'get',
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

# marktest
a simple way to test web api

## 无非是想做这些

* 太懒了，不想一行行的写测试，所以最终要实现用一个md文档就可以跑api的测试

然而从网上并没有很贴切的对 web api 测试的标准，所以先从这几部分下手

1. session与cookie管不了了，使用者自己通过fake解决
2. 支持各种rest方法，与各种传入参数，对于每个参数可测试其require，unique，type
3. 对于返回的信息，测试其statusCode，对于返回的body，可测试type与具体值
4. 考虑可能的需要储存变量的情况
5. 想到合适的结构来放置上述信息后就可做出对应md2obj来实现了

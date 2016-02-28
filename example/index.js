module.exports = {
  init: {
    app: '',
    params: {} // params you want to save
  }
  descStr: [{
    it: 'should get',
    get: '/api/resume/:id', // method and url
    req: {
      query: {
        id: 123
      },
      body: {
        param: 123
      }
    },
    res: {
      code: 200,
      body: {
        id: 1234
      },
      save: ['key1', 'key2']
    }
  }]
};

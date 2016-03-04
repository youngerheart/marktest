require('./../src/index')({
  init: {
    host: 'https://www.ele.me/restapi/v1'
  },
  'what about restaurant_categories?': [{
    desc: 'should return current data.',
    url: '/restaurant_categories?geohash=wtw38z04wm0',
    res: {
      code: 200,
      body: [{
        id: {
          default: Number,
          options: ['type', 'required']
        }
      }]
    }
  }]
});

module.exports = {
  init: {
    host: 'hire-api.test.ele.me',
    params: {}
  },
  'what about login?': [{
    it: 'should return 401 if I don\'t get userfake api.',
    url: '/resume',
    res: {
      code: 401
    }
  }, {
    it: 'should return userInfo if I get userfake api.',
    url: '/user-fake',
    res: {
      code: 200,
      body: {
        user_id: {
          default: Number,
          options: ['required', 'type']
        }
      }
    }
  }, {
    it: 'should return 401 if I don\'t get adminfake api.',
    url: '/job/admin',
    res: {
      code: 401
    }
  }, {
    it: 'should return adminInfo if I get adminfake api.',
    url: '/admin-fake',
    res: {
      code: 200,
      body: {
        walle_id: {
          default: Number,
          options: ['required', 'type']
        }
      }
    }
  }],
  'what about resume?': [{
    it: 'should make correct behavior while I post that form',
    url: '/resume',
    method: 'post',
    req: {
      body: {
        realName: {
          default: 'hehe',
          options: ['required', 'type']
        },
        household: {
          default: '上海',
          options: ['required', 'type']
        },
        phone: {
          default: '12345',
          options: ['required', 'type']
        },
        cardType: {
          default: '123',
          options: ['required', 'type']
        },
        cardNum: {
          default: '123',
          options: ['required', 'type']
        },
        awardExperience: {
          default: undefined,
          options: ['type']
        },
        eduExperience: [{
          dateStart: {
            default: Date,
            options: ['required']
          },
          dateEnd: {
            default: Date,
            options: ['required']
          },
          collage: {
            default: String,
            options: ['required']
          }
        }],
        workExperience: [{
          dateStart: {
            default: Date,
            options: ['required']
          },
          dateEnd: {
            default: Date,
            options: ['required']
          },
          company: {
            default: String,
            options: ['required']
          }
        }],
        projectExperience: [{
          dateStart: {
            default: Date,
            options: ['required']
          },
          dateEnd: {
            default: Date,
            options: ['required']
          },
          duties: {
            default: String,
            options: ['required']
          }
        }]
      }
    }
  }]
};

module.exports = {
  init: {
    host: 'http://hire-api.elenet.me',
    params: {}
  },
  'what about login?': [{
    desc: 'should return 401 if I don\'t get userfake api.',
    url: '/resume',
    res: {
      code: 401
    }
  }, {
    desc: 'should return userInfo if I get userfake api.',
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
    desc: 'should return 401 if I don\'t get adminfake api.',
    url: '/job/admin',
    res: {
      code: 401
    }
  }, {
    desc: 'should return adminInfo if I get adminfake api.',
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
    desc: 'should make correct behavior while I post that form',
    url: '/resume',
    method: 'post',
    req: {
      body: {
        realName: {
          default: 'hehe',
          options: ['required', 'type']
        },
        practice: {
          default: false,
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
          },
          profession: String,
          degree: String,
          languageLevel: String,
          rank: String
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
          },
          category: String,
          jobName: String,
          department: String,
          place: String,
          salary: String,
          describe: String
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
    },
    res: {
      code: 204,
      testCode: [204, 400]
    }
  }, {
    desc: 'should get own resume',
    url: '/resume',
    res: {
      code: 200,
      body: {
        realName: {
          default: String,
          options: ['required', 'type']
        }
      }
    }
  }]
};

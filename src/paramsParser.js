var params = {};

var getKeys = (str) => {
  if(str[str.length - 1] === ']') str = str.slice(-0, -1);
  str = str.replace(/\W+/g, '.');
  return str.split('.');
};

module.exports = {
  init(obj) {
    params = obj;
  },
  get(str) {
    var keys = getKeys(str);
    var walk = (obj, i) => {
      if(!i) i = 0;
      if(!keys[i]) return obj;
      if(typeof obj[keys[i]] === 'undefined') return;
      if(typeof obj[keys[i]] === 'object') return walk(obj[keys[i]], ++i);
    }
    return walk(params);
  },
  set(str, val) {
    var keys = getKeys(str);
    var walk = (obj, i) => {
      if(!i) i = 0;
      if(keys[i + 1]) {
        if(isNaN(keys[i + 1])) obj[keys[i]] = {};
        else obj[keys[i]] = [];
        walk(obj[keys[i]], ++i);
      } else {
        obj[keys[i]] = val;
      }
    }
    walk(params);
  },
  url(url) {
    var args = url.match(/\$\{(.*?)\}/g);
    if(!args) return url;
    args = args.map(x => x.slice(2,-1));
    args.forEach((arg) => {
      url = url.replace('${' + {arg} + '}', module.exports.get(arg));
    });
    return url;
  }
};

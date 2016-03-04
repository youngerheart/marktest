var params = {};
var keys = null;

var getKeys = (str) => {
  if(str[str.length - 1] === ']') str = str.slice(-0, -1);
  str = str.replace(/\W+/g, '.');
  return str.split('.');
};

var walk = (obj, i) => {
  if(!i) i = 0;
  if(typeof obj[keys[i]] === 'undefined') return;
  else if(typeof obj[keys[i]] === 'object') return walk(obj[keys[i]], ++i);
  else return JSON.parse(JSON.stringify(obj[keys[i]]));
}

module.exports = {
  init(obj) {
    params = obj;
  },
  get(str) {
    keys = getKeys(str);
    return walk(params);
  },
  set(str, val) {
    keys = getKeys(str);
    var walk = (obj, i) => {
      if(!i) i = 0;
      if(keys[i + 1]) {
        if(isNaN(keys[i + 1])) obj[keys[i]] = {};
        else obj[keys[i]] = [];
        return walk(obj[keys[i]], ++i);
      } else {
        obj[keys[i]] = val;
        return true;
      }
    }
    return walk(params);
  },
  url(url) {
    var args = url.match(/\$\{(.*?)\}/g);
    if(!args) return url;
    args = args.map(x => x.slice(2,-1));
    args.forEach((arg) => {
      url = url.replace('${' + arg + '}', module.exports.get(arg) || '');
    });
    return url;
  },
  fetch(obj, str, key) {
    keys = getKeys(str);
    var value = walk(obj);
    return module.exports.set(key, value);
  }
};

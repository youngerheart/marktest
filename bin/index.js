const mt = require('./../src/index')
const fs = require('fs');
const path = require('path');
const fName = process.argv[2];
if(!fName) return console.log('\x1b[36m', 'Marktest Error: should enter filename' ,'\x1b[0m');
if(path.extname(fName) !== '.json') return console.log('\x1b[36m', 'Marktest Error: only support file extension: json' ,'\x1b[0m');
mt(require(path.normalize(process.cwd() + '/' + fName)));

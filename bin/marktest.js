#!/usr/bin/env node
const Mocha = require('mocha');
const path = require('path');
const mocha = new Mocha();

mocha.reporter('spec').ui('bdd').ignoreLeaks();
mocha.addFile(path.normalize(__dirname + '/index.js')).run();

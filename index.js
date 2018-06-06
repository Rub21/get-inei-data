#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const format = require('./src/format');
const html2row = require('./src/html2row');
const grid = require('./src/grid');
const action = argv._[0];
switch (action) {
  case 'format':
 	format(argv.file);
    break;
  case 'html2row':
 	html2row(argv.url);
    break;
   case 'grid':
 	grid(argv.file);
    break;
  default:
    console.log('unknown command');
}

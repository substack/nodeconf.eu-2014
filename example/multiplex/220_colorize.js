var spawn = require('child_process').spawn;
var multiplex = require('multiplex');
var colorize = require('ansi-color-stream');

var m = multiplex();

m.createStream(1).pipe(colorize('green')).pipe(process.stdout);
m.createStream(2).pipe(colorize('red')).pipe(process.stderr);

process.stdin.pipe(m);

// 220_colorize.js

var spawn = require('child_process').spawn;
var multiplex = require('multiplex');


var m = multiplex();

m.createStream(1).pipe(process.stdout);
m.createStream(2).pipe(process.stderr);

process.stdin.pipe(m);

// 210_multiplex_unpack.js

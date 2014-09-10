var spawn = require('child_process').spawn;
var multiplex = require('multiplex');

var cmd = process.argv.slice(2);
var ps = spawn(cmd[0], cmd.slice(1));

var m = multiplex();
m.pipe(process.stdout);

ps.stdout.pipe(m.createStream(1));
ps.stderr.pipe(m.createStream(2));

process.stdin.pipe(ps.stdin);

// 200_multiplex_pack.js

var spawn = require('child_process').spawn;
var through = require('through2');

var cmd = process.argv.slice(2);
var ps = spawn(cmd[0], cmd.slice(1));

var output = through();
output.pipe(process.stdout);

ps.stdout.pipe(through(function (buf, enc, next) {
    var pre = Buffer(3);
    pre[0] = 1;
    pre.writeUInt16BE(buf.length, 1);
    output.write(Buffer.concat([ pre, buf ]));
    next();
}));

ps.stderr.pipe(through(function (buf, enc, next) {
    var pre = Buffer(3);
    pre[0] = 2;
    pre.writeUInt16BE(buf.length, 1);
    output.write(Buffer.concat([ pre, buf ]));
    next();
}));

process.stdin.pipe(ps.stdin);

// 140.js

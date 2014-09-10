var spawn = require('child_process').spawn;
var through = require('through2');

var cmd = process.argv.slice(2);
var ps = spawn(cmd[0], cmd.slice(1));

var output = through();
output.pipe(process.stdout);

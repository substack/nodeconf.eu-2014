var spawn = require('child_process').spawn;

var cmd = process.argv.slice(2);
var ps = spawn(cmd[0], cmd.slice(1));

var dataplex = require('dataplex');
var net = require('net');
var con = net.connect(5001);

var plex = dataplex();
plex.open('/abc').pipe(process.stdout);

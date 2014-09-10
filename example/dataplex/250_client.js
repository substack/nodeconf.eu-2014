var dataplex = require('dataplex');
var net = require('net');
var con = net.connect(5001);

var plex = dataplex();
plex.open('/trex').pipe(process.stdout);
con.pipe(plex).pipe(con);

// 250_client.js

var sock = require('shoe-bin')('/sock');
var pool = require('botnet-pool')(require('botnet-browser-worker'));
sock.pipe(pool.join()).pipe(sock);

var batchdb = require('batchdb-shell');
var db = require('level')('/tmp/compute.db');
var pool = require('bot-pool')();

var compute = batchdb(db, {
    path: '/tmp/compute.blobs',
    run: function () { return pool.run() }
});

var http = require('http');
var api = require('batchdb-web-api')(compute);
var ui = require('batchdb-web-ui')(compute);

compute.run();

var server = http.createServer(function (req, res) {
    if (api.exec(req, res)) return;
    if (ui.exec(req, res)) return;
    
    res.statusCode = 404;
    res.end('not found\n');
});
server.listen(5000);

var shoe = require('shoe-bin');
var sock = shoe(function (stream) {
    stream.pipe(pool.attach()).pipe(stream);
});
sock.install(server, '/pool');

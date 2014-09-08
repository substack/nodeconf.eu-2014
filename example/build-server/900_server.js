var batchdb = require('batchdb-shell');
var db = require('level')('/tmp/compute.db');
var compute = batchdb(db, { path: '/tmp/compute.blobs' });

var http = require('http');
var api = require('batchdb-web-api')(compute);

compute.run();

var server = http.createServer(function (req, res) {
    if (api.exec(req, res)) return;
    
    res.statusCode = 404;
    res.end('not found\n');
});
server.listen(5000);

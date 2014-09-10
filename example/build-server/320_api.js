var level = require('level');
var db = level('/tmp/build-server.db');
var compute = require('batchdb-shell')(db, { path: '/tmp/build-server.blob' });
compute.run();

var http = require('http');
var api = require('batchdb-web-api')(compute);

var server = http.createServer(function (req, res) {
    if (api.exec(req, res)) return;
    
    res.statusCode = 404;
    res.end('not found\n');
});
server.listen(5000);

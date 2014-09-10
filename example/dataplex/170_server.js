var dataplex = require('dataplex');
var fs = require('fs');
var net = require('net');

var server = net.createServer(function (stream) {
    var plex = dataplex();
    plex.add('/abc', function (opts) {
        return fs.createReadStream(__dirname + '/data/abc.txt', opts);
    });
    plex.add('/trex', function (opts) {
        return fs.createReadStream(__dirname + '/data/trex.txt', opts);
    });
    stream.pipe(plex).pipe(stream);
});
server.listen(5001);

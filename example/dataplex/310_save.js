var dataplex = require('dataplex');
var stringify = require('JSONStream').stringify;
var db = require('level')('/tmp/users.db', {
    keyEncoding: require('bytewise')
});
var defined = require('defined');
var net = require('net');
var blob = require('content-addressable-blob-store')({
    path: '/tmp/music.blob'
});

var server = net.createServer(function (stream) {
    var plex = dataplex();
    plex.add('/users', function (opts) {
        return db.createReadStream({
            gt: [ 'user', defined(opts.gt, null) ],
            lt: [ 'user', defined(opts.lt, undefined) ]
        }).pipe(stringify());
    });
    stream.pipe(plex).pipe(stream);
});
server.listen(5001);

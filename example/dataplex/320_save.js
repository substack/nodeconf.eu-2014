var dataplex = require('dataplex');
var stringify = require('JSONStream').stringify;
var db = require('level')('/tmp/users.db', {
    keyEncoding: require('bytewise')
});
var duplexer = require('duplexer2');
var through = require('through2');
var defined = require('defined');
var net = require('net');
var store = require('content-addressable-blob-store')({
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
    plex.add('/save/music', function (opts) {
        var w = store.createWriteStream();
        var output = through();
        
        return duplexer(w, output);
    });
    stream.pipe(plex).pipe(stream);
});
server.listen(5001);

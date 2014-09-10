var db = require('level')('/tmp/users.db', {
    keyEncoding: require('bytewise')
});
var store = require('content-addressable-blob-store')({
    path: '/tmp/music.blob'
});
var http = require('http');
var plex = require('./plex.js')(db, store);

var server = http.createServer(function (stream) {
    // ...
});
server.listen(5001);

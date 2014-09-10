var db = require('level')('/tmp/users.db', {
    keyEncoding: require('bytewise')
});
var store = require('content-addressable-blob-store')({
    path: '/tmp/music.blob'
});
var http = require('http');
var plex = require('./plex.js')(db, store);

var router = require('routes')();
router.addRoute('/save/music', function (req, res) {
    res.setHeader('content-type', 'application/json');
    req.pipe(plex.open('/save/music')).pipe(res);
});

var server = http.createServer(function (req, res) {
    var m = router.match(req.url);
    if (m) return m.fn(req, res);
    res.statusCode = 404;
    res.end('not found\n');
});
server.listen(5001);

var level = require('level');
var db = level('/tmp/build-server.db', {
    keyEncoding: require('bytewise'),
    valueEncoding: 'json'
});
var store = require('content-addressable-blob-store')({
    path: '/tmp/build-server.blob'
});

var http = require('http');
var router = require('router');

router.addRoute('/create', function (req, res, params) {
    var w = req.pipe(store.createStream());
    w.on('close', function () {
        var now = Date.now();
        db.batch([
            { type: 'put', key: [ 'job', w.key ], value: 0 },
            { type: 'put', key: [ 'pending', now, w.key ], value: 0 }
        ]);
        res.end(w.key);
    });
});

var server = http.createServer(function (req, res) {
    var m = router.match(req.url);
    if (m) return m.fn(req, res, m.params);
    res.statusCode = 404;
    res.end('not found\n');
});
server.listen(5000);

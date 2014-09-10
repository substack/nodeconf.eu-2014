var level = require('level');
var db = level('/tmp/build-server.db');
var compute = require('batchdb')(db, {
    path: '/tmp/build-server.blob',
    run: function () {
        // return a duplex stream here
        // input: job payload
        // output: results
    }
});
compute.run();

var stringify = require('JSONStream').stringify;
var http = require('http');
var router = require('router');

router.addRoute('/create', function (req, res, params) {
    req.pipe(compute.add(function (err, jobkey) {
        if (err) res.end(err + '\n')
        else res.end(jobkey)
    }));
});

router.addRoute('/list/:type', function (req, res, params) {
    compute.list(params.type).pipe(stringify()).pipe(res);
});

router.addRoute('/blob/:id', function (req, res, params) {
    compute.get(params.id).pipe(res);
});

var server = http.createServer(function (req, res) {
    var m = router.match(req.url);
    if (m) return m.fn(req, res, m.params);
    res.statusCode = 404;
    res.end('not found\n');
});
server.listen(5000);

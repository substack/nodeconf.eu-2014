var batchdb = require('batchdb-shell');
var db = require('level')('/tmp/compute.db');
var compute = batchdb(db, { path: '/tmp/compute.blobs' });
var http = require('http');
var router = require('routes')();
var through = require('through2');

router.addRoute('/create', function (req, res, m) {
    if (req.method !== 'POST') return error(404, res, 'not a POST');
    req.pipe(compute.add(function (err, jobkey) {
        if (err) error(500, res, err);
        else res.end(jobkey)
    }));
});

router.addRoute('/list/:type', function (req, res, m) {
    if (req.method !== 'GET') return error(404, res, 'not a GET');
    var s = compute.list(m.params.type);
    if (!s) return error(404, res, 'unknown list type');
    s.pipe(through.obj(function (row, enc, next) {
        this.push(JSON.stringify(row) + '\n');
        next();
    })).pipe(res);
});

router.addRoute('/result/:id', function (req, res, m) {
    if (req.method !== 'GET') return error(404, res, 'not a GET');
    var s = compute.getResult(m.params.id);
    s.on('error', function (err) { error(500, res, err) });
    s.pipe(res);
});

router.addRoute('/job/:id', function (req, res, m) {
    if (req.method !== 'GET') return error(404, res, 'not a GET');
    var s = compute.getJob(m.params.id);
    s.on('error', function (err) { error(500, res, err) });
    s.pipe(res);
});

var server = http.createServer(function (req, res) {
    var m = router.match(req.url);
    if (m) m.fn(req, res, m);
    compute.getResult(process.argv[2]).pipe(process.stdout);
});
server.listen(5000);

function error (code, res, err) {
    res.statusCode = code;
    res.end(String(err)
}

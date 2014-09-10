var dataplex = require('dataplex');
var stringify = require('JSONStream').stringify;
var duplexer = require('duplexer2');
var through = require('through2');
var defined = require('defined');

module.exports = function (db, store) {
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
        w.on('close', function () { output.end(w.key) });
        return duplexer(w, output);
    });
    stream.pipe(plex).pipe(stream);
};

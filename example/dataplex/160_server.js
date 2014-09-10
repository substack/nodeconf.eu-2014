var dataplex = require('dataplex');
var fs = require('fs');


function onstream (stream) {
    var plex = dataplex();
    plex.add('/abc', function (opts) {
        return fs.createReadStream(__dirname + '/data/abc.txt', opts);
    });
    plex.add('/trex', function (opts) {
        return fs.createReadStream(__dirname + '/data/trex.txt', opts);
    });
    stream.pipe(plex).pipe(stream);
}

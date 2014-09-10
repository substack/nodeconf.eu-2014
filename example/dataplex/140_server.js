var dataplex = require('dataplex');



function onstream (stream) {
    var plex = dataplex();
    plex.add('/abc', function (opts) {
        
    });
    plex.add('/trex', function (opts) {
        
    });
    stream.pipe(plex).pipe(stream);
}

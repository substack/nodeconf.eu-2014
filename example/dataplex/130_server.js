var dataplex = require('dataplex');



function onstream (stream) {
    var plex = dataplex();
    stream.pipe(plex).pipe(stream);
}

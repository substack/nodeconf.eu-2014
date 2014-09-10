var level = require('level');
var db = level('/tmp/build-server.db', {
    keyEncoding: require('bytewise'),
    valueEncoding: 'json'
});

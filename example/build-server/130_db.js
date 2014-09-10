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


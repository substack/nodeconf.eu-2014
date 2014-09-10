var duplexer = require('duplexer2');
var concat = require('concat-stream');
var through = require('through2');
var EventEmitter = require('events').EventEmitter;
var pack = require('shell-pack').pack;
var sock = require('shoe-bin')('/sock');
var pool = require('botnet-pool')(work);

var payload = document.querySelector('#payload');
sock.pipe(pool.join()).pipe(sock);

function work () {
    var output = through();
    return duplexer(concat(function (buf) {
        var body = buf.toString('utf8');
        payload.textContent = body;
        
        var ps = new EventEmitter;
        ps.stderr = through();
        ps.stdout = through();
        
        ps.stdout.once('end', function () { this._ended = true });
        ps.stderr.once('end', function () { this._ended = true });
        
        ps.exit = function (code) {
            process.nextTick(function () {
                ps.emit('exit', code);
                if (!ps.stdout._ended) ps.stdout.end();
                if (!ps.stderr._ended) ps.stderr.end();
            });
        };
        
        try {
            var fn = Function([ 'process', 'console' ], body);
            fn(ps, {
                log: function (msg) { ps.stdout.write(msg + '\n') },
                error: function (msg) { ps.stderr.write(msg + '\n') },
            });
        }
        catch (err) {
            ps.stderr.write(err + '\n');
            ps.exit(1);
        }
        pack(ps).pipe(output);
    }), output);
}

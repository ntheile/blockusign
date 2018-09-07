var express = require('express');
var app = express();
var cors = require('cors');
const url = require('url'); // built-in utility

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./temp');
}
var server = app.listen(8080, function() {
    console.log('server listening at 8080')
});
app.use(cors());

app.get('/manifest.json', function (req, res) {
    res.sendFile(__dirname + '/manifest.json');
});

app.get('/redirect', function (req, res) {
    if (req.query.authResponse) {
        localStorage.setItem('authResponse', req.query.authResponse)
        res.redirect(url.parse(req.url).pathname)
    } else {
        var token = localStorage.getItem('authResponse')
        localStorage.setItem('authResponse', '')
        res.send(
            `<h1>Redirected to electron app!</h1><script>window.location.href = "blockstack-electron://redirect?authResponse=${token}"; window.close();</script>`);
    }
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + req.originalUrl);
});

process.on('message', message => {
    if (message === 'quit') {
        server.close();
    }
});
process.send('started');
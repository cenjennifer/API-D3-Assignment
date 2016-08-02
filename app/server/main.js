var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    apiUrl = 'THIS_SHOULD_BE_THE_COMPANY_URL';

var path = require('path'),
    rootPath = path.join(__dirname, '../../'),
    indexPath = path.join(rootPath, './server/index.html'),
    npmPath = path.join(rootPath, './node_modules'),
    publicPath = path.join(rootPath, './public'),
    appPath = path.join(rootPath, './app');

// Node express server setup.
var server = express();
server.set('port', 3000);

server.use(express.static(npmPath));
server.use(express.static(publicPath));
server.use(express.static(appPath));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

// authenticating app to retrieve token 
request.post({
    url: apiUrl + '/authenticate',
    qs: {
        "username": "THE_CLIENT_USERNAME",
        "key": "THE CLIENT_KEY"
    }
}, function(error, res, body) {
    if (error) {
        return console.log('Error', error);
    }
    if (res.statusCode !== 200) {
        return console.log('Invald Status Code');
    }
    var r = JSON.parse(body);
    server.set("token", r.response);
});

// request to hedgeable api
server.all('/client/*', function(req, res) {
    req.body.token = server.get('token');
    req.body.usertoken = server.get('usertoken');

    request({
        url: apiUrl + req.url,
        method: req.method,
        qs: req.body
    }, function(err, response, body) {
        var r = JSON.parse(body);
        if (!server.get('usertoken') && (r.error === 0)) {
            server.set('usertoken', r.response.token);
        }
        res.send(r);
    });
});

//request to loading the index.html page
server.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Start Server.
server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});
var fs = require("fs");
var host = "127.0.0.1";
var port = 1337;
var express = require("express");
var http = require('http');
var watch = require('watch');
var reload = require("reload");
var app = express();


app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder
app.set('port', port)
app.get("/", function(request, response){ //root dir
    res.sendFile(path.join(__dirname + "/public", 'index.html'));
});

var server = http.createServer(app);
var reloadServer = reload(server, app);
watch.watchTree(__dirname + "/public", function (f, curr, prev) {
    // Fire server-side reload event
    reloadServer.reload();
});
server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});

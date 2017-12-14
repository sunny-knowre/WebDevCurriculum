var express = require('express'),
path    = require('path'),
fs      = require('fs'),
app     = express();

app.use(express.static('client'));
app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, 'index.html'));
});

var server = app.listen(8080, function () {
  console.log('Server started!');
});
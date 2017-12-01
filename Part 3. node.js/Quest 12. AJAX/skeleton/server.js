var express = require('express'),
    path    = require('path'),
    fs      = require('fs'),
    app     = express();

app.use(express.static('client'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/files', function (req, res) {
	var folder = './notes/';
	var junk = function(i){
		console.log(i);
		if(i === '.DS_Store')
			return true;
		else
			return false;
	};

	fs.readdir(folder, (err, files) => {
      files.filter(junk).forEach(file => {
		console.log(file);
	  });
	});
});

app.post('/newfile',function(req,res){
	if( req.method === 'POST'){
		var jsonString = '';

		req.on('data', function (data) {
            jsonString += data;
		});
		
        req.on('end', function () {
			console.log(JSON.parse(jsonString).title);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end();
		});
	}else{
		res.writeHead(400, {'Content-Type': 'text/plain'});
		res.end();
	}

});
/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

var server = app.listen(8080, function () {
	console.log('Server started!');
});
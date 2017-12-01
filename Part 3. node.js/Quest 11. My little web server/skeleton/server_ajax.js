var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
	if( req.method === 'POST'){
		var text = "";
		req.on('data', function (data) {
            text += data.toString();
        });
        req.on('end', function () {
			var re = new RegExp('bar=(.*)','g');
			var bar = re.exec(text);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end("Hello, " + bar[1]);
        });
	} else {
		res.writeHead(200, {'Content-Type': 'text/html' ,
							'Access-Control-Allow-Origin': '*' });
		var index = fs.readFileSync('index.html');
		res.end(index);
	}
	// TODO: 이 곳을 채워넣으세요..!
}).listen(8080)
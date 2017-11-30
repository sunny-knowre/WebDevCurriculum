var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
	var parsed = url.parse(req.url);
		res.writeHead(200, {'Content-Type': 'text/plain' });
	if( req.method === 'GET' || req.method === 'POST'){
		if (parsed.pathname === '/foo' && parsed.query && parsed.query.substr(0,4) === 'bar='){
			var re = new RegExp('bar=(.*)','g');
			var bar = re.exec(parsed.query);
			res.end("Hello, " + bar[1]);
		}
	}
	res.end('Hello World!');
	// TODO: 이 곳을 채워넣으세요..!
}).listen(8080);

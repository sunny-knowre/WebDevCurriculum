var express = require('express'),
    path    = require('path'),
    fs      = require('fs'),
    app     = express();

var notesDir = './notes/';
var cache = {};

var sendJson = function(res,json){
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(json);
}
var sendInvalid = function(res){
	res.writeHead(400, {'Content-Type': 'text/plain'});
	res.end();
}
var updateCache = function(id,title,body){
	var entry = {
		title: title,
		body : body
	}
	
	cache[id] = entry;
}

var init = function(){	
	var files = fs.readdirSync(notesDir);
	var junk = function(t){ return t.match('.*\\.txt') }; // need for things like .DS_Store
	files.filter(junk).forEach(filename => {		 
		var file = fs.readFileSync(notesDir+filename).toString();
		var re = new RegExp('(note-\\d+)\\.txt','g');
		var id = re.exec(filename)[1];
		var title = file.split('\n')[0];
		if(title.length > 70)
			title = title.substring(0,70);
		
		updateCache(id,title,file);
	});
}();

app.use(express.static('client'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/navlist', function (req, res) {
	var list = [];
	for (var key in cache) {
		var item = {
			id : key,
			title: cache[key].title,
			body : cache[key].body
		}
		list.push(item);
	}
	sendJson(res, JSON.stringify(list));
});

app.get('/file/:id', function (req, res) {
	var id = req.params.id;
	if(cache[id])
		sendJson(res, JSON.stringify(cache[id].body));
	else
		sendInvalid(res);
});

app.post('/save', function (req,res){
	var jsonString = '';
	req.on('data', function (data) {
		jsonString += data;
	});
	
	req.on('end', function () {
		var data = JSON.parse(jsonString);
		updateCache(data.id, data.title, data.body);
		saveToDisk(data.id+".txt",data.body,res);
	});
});

var saveToDisk = function(filename, data, res){
	fs.writeFile(notesDir+filename, data, function(err) {
		if(err) {
			return console.log(err);
		}
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('save sucess');
	}); 
}

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

var server = app.listen(8080, function () {
	console.log('Server started!');
});
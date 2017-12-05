var express = require('express'),
	session = require('express-session'),
	path = require('path'),
	fs = require('fs'),
	app = express(),
	users = require('./users');

var notesDir = './notes/';
var cache = {};

var _updateCache = function (id, title, body) {
	var entry = {
		title: title,
		body: body
	}
	cache[id] = entry;
}

var _saveToDisk = function (filename, data, res) {
	fs.writeFile(notesDir + filename, data, function (err) {
		if (err) {
			return console.log(err);
		}
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('saved "' + filename + '"');
	});
}

var _deleteFromDisk = function (filename, res) {
	fs.unlink(notesDir + filename, function (err) {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('no file "' + filename + '" on disk');
			return;
		}
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('deleted "' + filename + '"');
	});
}
var init = function () {
	var files = fs.readdirSync(notesDir);
	var junk = function (t) { return t.match('.*\\.txt') }; // need for things like .DS_Store
	files.filter(junk).forEach(filename => {
		var file = fs.readFileSync(notesDir + filename).toString();
		var re = new RegExp('(note-\\d+)\\.txt', 'g');
		var id = re.exec(filename)[1];
		var title = file.split('\n')[0];
		if (title.length > 70)
			title = title.substring(0, 70);
	
		_updateCache(id, title, file);
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
			id: key,
			title: cache[key].title,
			body: cache[key].body
		}
		list.push(item);
	}
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(list));
});

app.post('/save', function (req, res) {
	var jsonString = '';
	req.on('data', function (data) {
		jsonString += data;
	});

	req.on('end', function () {
		var data = JSON.parse(jsonString);
		_updateCache(data.id, data.title, data.body);
		_saveToDisk(data.id + ".txt", data.body, res);
	});
});

app.post('/delete', function (req, res) {
	var jsonString = '';
	req.on('data', function (data) {
		jsonString += data;
	});

	req.on('end', function () {
		var data = JSON.parse(jsonString);
		delete cache[data.id];
		_deleteFromDisk(data.id + ".txt", res);
	});
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

var server = app.listen(8080, function () {
	console.log('Server started!');
});
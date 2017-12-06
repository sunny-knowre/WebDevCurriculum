
var fs = require('fs');
var userStore = require('./users');
var users = userStore.getAll();

var DataStore = function (dir) {
	this.notesDir = dir;
	this.cache = {};
	this.currents = {};
	this.refreshCache();
}

DataStore.prototype.refreshCache = function () {
	for (var key in users) {
		
		var userId = users[key].id;
		this.cache[userId] = {};
		var currentTabFile = this.notesDir + '_current_tabs/' + userId;

		var files = fs.readdirSync(this.notesDir + userId + '/');
		var junk = function (t) { return t.match('.*\\.txt') }; // need for things like .DS_Store
		files.filter(junk).forEach(filename => {
			var file = fs.readFileSync(this.notesDir + userId + '/' + filename).toString();
			var re = new RegExp('(note-\\d+)\\.txt', 'g');
			var id = re.exec(filename)[1];
			this.updateCache(userId, id, file);
		});
		
		if(!fs.existsSync(currentTabFile))
			this.currents[userId] = '';
		else
			this.currents[userId] = fs.readFileSync( currentTabFile ).toString();
	};
}

DataStore.prototype.updateCache = function (user, id, body) {
	var title = this.getTitle(body);
	this.cache[user][id] = {
		title: title,
		body: body
	};
}

DataStore.prototype.save = function (user, body, res) {
	var before = null
	if (this.cache[user][body.id]) {
		before = this.cache[user][body.id]
	}

	this.updateCache(user, body.id, body.body)
	this.setCurrentTab(user,body.id);
	fs.writeFile(this.notesDir + user + '/' + body.id + ".txt", body.body, function (err) {
		if (err) {
			if (before)
				this.cache[user][id] = before;
			else
				delete this.cache[user][id];

			return console.log(err);
		}
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('saved "' + body.id + '"');
	});
}

DataStore.prototype.delete = function (user, body, res) {
	delete this.cache[user][body.id];
	fs.unlink(this.notesDir + user + '/' + body.id + ".txt", function (err) {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('no file "' + body.id + '" on disk');
			return;
		}
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('deleted "' + body.id + '"');
	});
}

DataStore.prototype.get = function (user, id, res) {
	if (this.cache[user][id]) {
		this.currents[user] = id;
		this.setCurrentTab(user, id,res);
		return {
			title: this.cache[user][id].title,
			body: this.cache[user][id].body
		};
	}
	return false;
}

DataStore.prototype.getAll = function (user) {
	var list = [];
	var cache = this.cache[user];
	for (var key in cache) {
		list.push({
			id: key,
			title: cache[key].title
		})
	}

	return {
		tabs: list,
		current: this.currents[user]
	}
}
DataStore.prototype.setCurrentTab = function(nick,id, res){
	this.currents[nick] = id;
	
	fs.writeFile(this.notesDir + '_current_tabs/' + nick , id, function (err) {
		if (err) {
			return console.log(err);
		}
	});
}

DataStore.prototype.getTitle = function (file) {
	var title = file.split('\n')[0];
	if (title.length > 70)
		title = title.substring(0, 70);
	return title;
}

module.exports = DataStore;

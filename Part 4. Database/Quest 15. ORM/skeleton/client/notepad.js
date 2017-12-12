var _ajax = (function () {
	var baseurl = 'http://localhost:8080';
	var makeNewRequest = function () {
		var xhttp = new XMLHttpRequest();
		return xhttp;
	}

	var req = function (path, params, callback, method) {
		var xhttp = makeNewRequest();
		xhttp.open(method, baseurl + '/' + path, true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(JSON.stringify(params));
		xhttp.onload = callback;
	}

	return {
		get: function () {
			var args = [].slice.call(arguments);
			args.push("GET");
			return req.apply(this, args);
		},
		post: function () {
			var args = [].slice.call(arguments);
			args.push("POST");
			return req.apply(this, args);
		}
	};

})();

var Notepad = function () {
	var self = this;
	this.noteList    = {};
	this.currentNote = null;
	this.editorDOM   = document.querySelector('.editor');
	this.fileListDOM = document.querySelector('.file-list');
	this.saveBtn     = document.getElementById('save');
	this.deleteBtn   = document.getElementById('delete');
	this.logoutDOM   = document.getElementById('logout');

	this.init();
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
};

Notepad.prototype.init = function () {
	var self = this;

	_ajax.get('navlist', {}, function () {
		var data    = JSON.parse(this.responseText);
		var tabs    = data.tabs;
		var current = data.current;

		self.logoutDOM.innerHTML = 'logout ' + data.user;
		tabs.forEach(file => {
			var note = new Note(file.id, file.title);
			self.noteList[file.id] = note;
		});
		if (tabs.length > 0) {
			if (!current)
				self.noteList[tabs[0].id].emitLoad();
			else
				self.noteList[current].emitLoad();
		}
	});

	document.getElementById("new-note").addEventListener('click', function (e) {
		self.newNote();
	});
	document.getElementById('delete').addEventListener('click', function (e) {
		self.deleteNote();
	});
	document.myForm.addEventListener('submit', function (e) {
		e.preventDefault();
		self.saveNote();
	});
	document.addEventListener('emitload', function (e) {
		e.stopPropagation();
		e.preventDefault();
		var note_id = e.target.id;
		self.currentNote = self.noteList[note_id];
		self.updateButtonStatus();
	});
	self.editorDOM.addEventListener('keydown', function (e) {
		if (e.keyCode == 13 && e.metaKey) {
			e.stopPropagation();
			e.preventDefault();
			self.saveNote();
		}
	});

}
Notepad.prototype.newNote = function () {
	var self = this;
	var params = {
		title: "new note",
		body: ""
	};

	_ajax.post('new', params, function () {
		var id = parseInt(this.responseText);
		var newNote = new Note(id, "new note");
		self.noteList[id] = newNote;
		self.updateButtonStatus();
		newNote.emitLoad();
	});
}
Notepad.prototype.updateButtonStatus = function () {
	if (Object.keys(this.noteList).length === 0 || this.currentNote === null) {
		this.saveBtn.setAttribute('disabled', true);
		this.deleteBtn.setAttribute('disabled', true);
	} else {
		this.saveBtn.removeAttribute('disabled');
		this.deleteBtn.removeAttribute('disabled');
	}
}
Notepad.prototype.saveNote = function () {
	if (this.currentNote)
		this.currentNote.save(this.editorDOM.value);
}
Notepad.prototype.deleteNote = function () {
	if (this.currentNote) {
		var result = confirm("Are you sure you want to delete?");
		if (result) {
			var note_id = this.currentNote.id;
			this.fileListDOM.removeChild(this.currentNote.dom);
			this.editorDOM.value = '';
			delete this.noteList[note_id];
			this.currentNote = null;
			var next = Object.keys(this.noteList).pop();
			console.log(next);
			if (next)
				this.noteList[next].emitLoad();

			this.updateButtonStatus();
			_ajax.post('delete', { id: note_id }, function () {
				console.log(this.responseText);
			});
			//Logic to delete the item
		}
	}
}

var Note = function (id, title) {
	var self = this;
	this.id = id;
	this.title = title;
	this.body = '';
	this.dom = this.createDom();

	this.dom.addEventListener('click', function (e) {
		e.preventDefault();
		self.emitLoad();
	});
}

Note.prototype.createDom = function () {
	var template = document.getElementById("note-template");
	var dom = template.cloneNode(true);
	dom.setAttribute("id", this.id);
	dom.innerHTML = this.title;

	dom.classList.toggle('hidden');
	document.querySelector('.file-list').appendChild(dom);
	return dom;
}
Note.prototype.emitLoad = function () {
	var self = this;
	var editor = document.querySelector('.editor');

	_ajax.get('note/' + self.id, {}, function () {
		var data = JSON.parse(this.responseText);
		if (data) {
			self.body = data.body;
			editor.value = self.body;
		} else {
			editor.value = '';
		}
	});
	// turn on active class
	[].map.call(document.querySelectorAll('.note'), function (n) {
		n.classList.remove('active');
	});
	this.dom.classList.add("active");

	// trigger event
	var event = document.createEvent('Event');
	event.initEvent('emitload', true, true);
	this.dom.dispatchEvent(event);
}
Note.prototype.save = function (newData) {
	var newtitle = this.getTitle(newData);
	this.title = newtitle;
	this.body = newData;
	this.dom.innerHTML = newtitle;
	var params = {
		id: this.id,
		title: this.title,
		body: this.body
	};
	_ajax.post('save', params, function () {
		console.log(this.responseText);
	});
}
Note.prototype.getTitle = function (data) {
	var title = data.split('\n')[0];
	if (title.length > 70)
		title = title.substring(0, 70);

	return title;
}

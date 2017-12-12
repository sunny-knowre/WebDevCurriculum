var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	path = require('path'),
	app = express();

var db = require('./db');
var auth = function (req, res, next) {
	if ((req.session && req.session.userId) || req.path === '/login') {
		return next();
	} else {
		return res.redirect('/login');
	}
};

app.use(session({
	secret: 'mvemjsun',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 10
	}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/client', express.static('client'));
app.use(auth);

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.get('/login', function (req, res) {
	res.sendFile(path.join(__dirname, '/client/login.html'));
});

app.post('/login', function (req, res) {
	db.user.findOne({
		where: { nickname: req.body.nick }
	}).then(function (u) {
		if (u) {
			u.verifyPass(req.body.nick,req.body.pass, function (isVerfied) {
				if (isVerfied) {
					req.session.userId = u.id;
					req.session.username = u.nickname;
					req.session.userEmail = u.email;
					req.session.current_tab = u.last_note;
					res.redirect('/');
				} else {
					res.redirect('/login');
				}

			});
		} else {
			res.redirect('/login');
		}
	});
});

app.get('/logout', function (req, res) {
	req.session.destroy(function (err) {
		if (err)
			console.log(err);
		else
			res.redirect('/login');
	});
});

app.get('/navlist', function (req, res) {

	db.note.getAllUserTitles(req.session.userId, function (tabs) {
		var result = {
			user: req.session.username,
			tabs: tabs,
			current: req.session.current_tab
		};
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(result));
	});
});

app.get('/note/:noteid', function (req, res) {
	req.session.current_tab = req.params.noteid;
	db.note.getNoteContents(req.params.noteid, function(result) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(result));
	}); 
});
app.post('/new', function (req, res) {
	var newnote = {
		title: req.body.title,
		body : req.body.body,
		userId: req.session.userId
	};

	db.note.create(newnote)
	.then(function(note){
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(note.get().id.toString());
	})
	.catch(function(err){
		return err;
	});
});

app.post('/save', function (req, res) {
	db.note.update({
			title: req.body.title,
			body: req.body.body
	},{
		where: { id: req.body.id }
	})
	.then(function(){
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('saved "' + req.body.id + '"');
	})
	.catch(function(err){
		return err;
	});
});

app.post('/delete', function (req, res) {
	db.note.destroy({ where: {id: req.body.id} })
	.then(function(){
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('deleted "' + req.body.id + '"');
	})
	.catch(function(err){
		return err;
	});
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

db.sequelize.sync().then(function () {
	app.listen(8080, function () {
		console.log('Server started!');
	});
});
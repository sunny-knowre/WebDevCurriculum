var express    = require('express'),
    session    = require('express-session'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    app        = express();

var users = require('./users');
var DataStore = require('./storage');
var store = new DataStore('./notes/');
var auth = function (req, res, next) {
	if ((req.session && req.session.userId) || req.path === '/login') {
		return next();
	} else {
		return res.redirect('/login');
	}
}
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
	var user = req.body;
	var found = users.check(user.nick, user.pass);
	if (found) {
		req.session.userId = found.id;
		req.session.userEmail = found.email;
		req.session.current_tab = found.current;
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
});

app.get('/logout', function (req, res) {
	req.session.destroy(function (err) {
		if (err)
			console.log(err)
		else
			res.redirect('/login');
	});
});

app.get('/navlist', function (req, res) {
	var data = store.getAll(req.session.userId);
	var current_tab = data.current;
	req.session.current_tab = data.current;
	var result = {
		user: req.session.userId,
		tabs: data.tabs,
		current: current_tab
	}
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(result));
});

app.get('/note/:noteid', function (req, res) {
	req.session.current_tab = req.params.noteid;
	var result = store.get(req.session.userId, req.params.noteid, res);
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(result));
});

app.post('/save', function (req, res) {
	store.save(req.session.userId, req.body, res);
});

app.post('/delete', function (req, res) {
	store.delete(req.session.userId, req.body, res);
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

var server = app.listen(8080, function () {
	console.log('Server started!');
});

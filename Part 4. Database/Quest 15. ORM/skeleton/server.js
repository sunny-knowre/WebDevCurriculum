var express    = require('express'),
    session    = require('express-session'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    app        = express();

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
		where: {nickname: req.body.nick}
	}).then(result => {
		console.log(result);	
	});
	// var found = users.check(user.nick, user.pass);
	// if (found) {
	// 	req.session.userId = found.id;
	// 	req.session.userEmail = found.email;
	// 	req.session.current_tab = found.current;
	// 	res.redirect('/');
	// } else {
	// 	res.redirect('/login');
	// }
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


db.sequelize.sync({force:true}).then(function (){
	db.user.bulkCreate([
		{
			nickname: 'Sunny',
			email: 'sunny@note.com',
			password: '90f81f57e4d8e28250cea42ebaf30be4a65c0febd60572dfa848e3e5b455ee98e3da177f72cc2f6b893d3263d4942375f3abe484947df6f74bbaeede5dae624c',
			salt: 'ld)S?kG:*jf~j*-=L~fjr-Nr:OsPeKYTTQdhrRL=8@$y@-Ly|$ZQEdr5tdNS.P{2'
		},
		{
			nickname: 'Kurt',
			email: 'kurt@note.com',
			password: '0243f7520ebc3a609f6094c419da423616e2cd765f68bfb4001931ec3fd9e430c91cae8a28bd0585a3441f4fdac32138e8cfaadbf028a6295f305efbc56f7b5e',
			salt: '0I%-}?A3{Z.c]kC1|*xmpM~Pnnr92K:IbJ{@qVw<~.wMo+ uGMV+O*S}l&y2&`zJ'
		},
		{
			nickname: 'root',
			email: 'root@note.com',
			password: '145b80d66bdec562cb3841a76fe743cc478b5aba25a065ce7b155bad36df201ef0317fd10d57ead13890fa3f7ed91904b3afc7c1b83eb9018c5ab66d57274687',
			salt: 'I.xKv;{pjcmQIjx+~O0{c+4Vg<`TTiasJPA]qdbrMca*]gF?jSZyU1UJwFHL+/b0'
		}
	]);

	app.listen(8080, function(){
		console.log('Server started!');
	});
});
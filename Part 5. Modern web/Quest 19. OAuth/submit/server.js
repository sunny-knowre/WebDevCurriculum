const express = require("express"),
      session = require("express-session"),
      bodyParser = require("body-parser"),
      path = require("path"),
      passport = require('./passport'),
      db = require("./db"),
      app = express();

const auth = function(req, res, next) {
  if ((req.session && req.session.userId) || 
    ["/login", "/auth/login", "/auth/google/callback"].includes(req.path)) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

app.use(
  session({
    secret: "mvemjsun",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 10
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/client", express.static("client"));
app.use(auth);

app.get('/auth/login', (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback', passport.authenticate('google'),
  (req, res) => {
    const redirect = req.session.oauth2return || '/';
    delete req.session.oauth2return;
    req.session.userId = req.user.id;
    req.session.userImage = req.user.img_url;
    req.session.username = req.user.nickname;
    req.session.userEmail = req.user.email;
    req.session.current_tab = req.user.last_note;
    res.redirect(redirect);
  }
);

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "/client/login.html"));
});

app.post("/login", async (req, res) => {
  try {
    const verified = await db.user.verifyPass(req.body.nick, req.body.pass);
    if (verified) {
      req.session.userId = verified.get("id");
      req.session.username = verified.get("nickname");
      req.session.userEmail = verified.get("email");
      req.session.current_tab = verified.get("last_note");
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});


app.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    if (err) console.log(err);
    else res.redirect("/login");
  });
});

app.get("/navlist", async (req, res) => {
  try {
    const tabs = await db.note.getAllUserTitles(req.session.userId);
    const result = {
      user: { name: req.session.username, img: req.session.userImage },
      tabs: tabs,
      current: req.session.current_tab
    };
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  }
});

app.get("/note/:noteid", async (req, res) => {
  req.session.current_tab = req.params.noteid;
  const result = await db.note.getNoteContents(req.params.noteid);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(result));
});

app.post("/new", async (req, res) => {
  try {
    const newnote = {
      title: req.body.title,
      body: req.body.body,
      userId: req.session.userId
    };
    const note = await db.note.create(newnote);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(note.get().id.toString());
  } catch (err) {
    console.log(err);
  }
});

app.post("/save", async (req, res) => {
  try {
    await db.note.update(
      { title: req.body.title, body: req.body.body },
      { where: { id: req.body.id } }
    );
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('saved "' + req.body.id + '"');
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  try {
    await db.note.destroy({ where: { id: req.body.id } });
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('deleted "' + req.body.id + '"');
  } catch (err) {
    console.log(err);
  }
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

db.sequelize.sync().then(function() {
  app.listen(8080, function() {
    console.log("Server started!");
  });
});

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const LokiStore = require('connect-loki')(session);
const morgan = require('morgan');

const postgre = require('./lib/postgre');

require('dotenv').config();
const env = process.env;
const port = env.port;

const app = express();

app.use(morgan('common'));
app.use(cors({
  origin: `http://localhost:${env.front_port}`,
  methods: ['GET', 'POST'],
  credentials: true
}))
app.use(express.json());
app.use(session(
  {
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 1 * 5 // 5 minute
    },
    name: 'test-sesh-id',
    resave: false,
    saveUninitialized: true,
    secret: 'secret! change this later',
    store: new LokiStore({})
  }
));
app.use((req, res, next) => {
  res.locals.signedIn = req.session.signedIn;
  res.locals.userId = req.session.userId;
  next();
});

function requiresAuth (req, res, next) {
  if (res.locals.signedIn) {
    next();
  } else {
    res.json({logout: true, msg: 'Current session is not authorised'});
  }
}

app.get('/feedback', (req, res) => {
  res.json({text: 'Here is a feedback from the server'});
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const result = await postgre.login(username, password);

  if (result.success) {
    req.session.signedIn = true;
    req.session.userId = result.id;
  }

  res.json(result);
});

app.post('/register', async (req, res) => {
  const {username, email, password} = req.body;

  const result = await postgre.register(username, email, password);

  res.json(result);
});

app.post('/settings/basic', requiresAuth, async (req, res) => {
  const {username, description} = req.body;

  const result = await postgre.updateBasic(username, description, res.locals.userId);

  res.json(result);
});

app.post('/settings/security', requiresAuth, async (req, res) => {
  const {oldPassword, password} = req.body;

  const result = await postgre.updatePassword(oldPassword, password, res.locals.userId);

  return result;
});

app.post('/settings/visible', requiresAuth, async (req, res) => {
  const result = await postgre.toggleVisibility(res.locals.userId);

  return result;
});

app.post('/settings/removal', requiresAuth, async (req, res) => {
  const {username, password} = req.body;

  const result = await postgre.removeUser(username, password, res.locals.userId);

  res.json(result);
});

app.post('/settings/logout', requiresAuth, async (req, res) => {
  delete req.session.userId;
  delete req.session.signedIn;

  res.json({success: true, msg: 'Logged out'})
});

app.listen(port, () => {
  console.log(`Started listening at ${port}`);
});
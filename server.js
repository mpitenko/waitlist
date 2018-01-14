var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var Sequelize = require('sequelize');

var CONFIG = require('./config.json');

var db = new Sequelize({
  database: 'sys',
  username: 'root',
  password: 'Newpass1',
  dialect: 'mysql'
});

require('./passport.js')(db);
var controllers = require('./controllers.js')(db);


/*
 * Routes
 */
var router = express.Router();

router.get('/', function (req, res) {
  res.end('It Works!');
});

router.get('/admin/logout', controllers.adminLogout);
router.get('/admin/login', controllers.adminLoginPage);
router.post('/admin/login', controllers.adminLogin);
router.get('/admin', isAuthenticated, controllers.adminPage);
router.get('/admin/getdata/:eventid', isAuthenticated, controllers.adminPageGetData);
router.get('/admin/getEvents', isAuthenticated, controllers.adminPageGetEvents);
router.get('/admin/changeOrder/:order/:event/:direction', isAuthenticated, controllers.adminChangeOrder);
router.get('/admin/removeItem/:order/:event', isAuthenticated, controllers.removeItem);
router.get('/admin/CreateEvent/:name', isAuthenticated, controllers.createEvent);
router.get('/admin/EditEvent/:name/:num', isAuthenticated, controllers.EditEvent);
router.get('/admin/DeleteEvent/:num', isAuthenticated, controllers.DeleteEvent);
router.get('/admin/AddClient/:name/:num', isAuthenticated, controllers.AddNewClient);

router.get('/waitlist/getWaitlist/:eventid', controllers.getWaitlist) ; 
router.get('/waitlist/getIdList', controllers.getIdList); 
router.get('/waitlist/getPreviousId/:id', controllers.getPreviousId);
router.get('/waitlist/getNextId/:id', controllers.getNextId);
router.get('/waitlist/getEventNameById/:id', controllers.getEventNameById);
router.get('/waitlist/getEventNames', controllers.getEventNames);

router.get('/waitlist', async function(req, res) {
  var id = await db.query("Select id from Event order by id limit 1")
    .then(function(myTableRows) {
      return myTableRows[0][0].id;
    });
  return res.redirect('/waitlist/' + id);
});     
router.get('/waitlist/:eventid', controllers.waitlistPage);
/*
 * End Routes
 */


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  else {
    res.status(401);
    return res.redirect('/admin/login');
  }
}

/*
 * App
 */
var app = express();

// set public directory
app.use(express.static('./public'));

app.use(cookieParser());

// connect request body parser to parse data from POST requests
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

var sessionStore = new SequelizeStore({
  db: db,
  //checkExpirationInterval:  60 * 1000, //15min // The interval at which to cleanup expired sessions in milliseconds.
  //expiration:   60 * 1000 //15min // The maximum age (in milliseconds) of a valid session.
}); 
app.use(session({
  secret: '87hascvuasvb87h2384uvn92',
  resave: false,
  saveUninitialized: true,
  name: 'waitlist.sid',
  cookie: {
    maxAge: 10 * 24 * 60 * 60 * 1000, //10 days
    secure: false
  },
  store: sessionStore,
  resave: false, // we support the touch method so per the express-session docs this should be set to false 
  proxy: true // if you do SSL outside of node.
}));
sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

// request logger (for all requests)
app.use(function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// connect routes
app.use(router);

// error logger if a route not found in routes above
app.use(function loggerError(req, res, next) {
  console.error('Error 404:', req.method, req.url);
  res.status(404);
  res.send('Not Found');
});

// run server process
app
  .listen(CONFIG.port, function onServerStart() {
    console.log('');
    console.log('Server running on: http://localhost:' + CONFIG.port);
    console.log('To shut down server, press <CTRL> + C at any time.');
    console.log('');
  });
/*
 * End App
 */

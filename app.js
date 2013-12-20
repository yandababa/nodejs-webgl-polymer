
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , MongoStore = require('connect-mongo')(express)
  , settings = require('./settings')
  , flash = require('connect-flash');
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
	app.use(flash());
    app.use(express.favicon());
    app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    app.use(app.router);//保留原来的
    app.use(express.static(path.join(__dirname, 'public')));
});

	
mongoose.connect('mongodb://'+settings.host + '/' + settings.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function callback() {
    console.log('yay!');
});  
	
app.use(express.session({
	secret: 'a4f8071f-c873-4447-8ee2',
	cookie: { maxAge: 2628000000 },
	store: new (require('express-sessions'))({
		storage: settings.db,
		instance: mongoose, // optional
		host: settings.host, // optional
		port: settings.port, // optional
		db: settings.db, // optional
		collection: 'sessions', // optional
		expire: 86400 // optional
	})
}));
app.configure('development', function () {
    app.use(express.errorHandler());
});

routes(app);//这个是新加的

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

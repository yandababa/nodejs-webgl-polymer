
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , MongoStore = require('connect-mongo')(express)
  , settings = require('./settings')
  , flash = require('connect-flash');
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('dog'));
	app.use(express.session({ cookie: { maxAge: 60000 }}));
	app.use(flash());
    app.use(app.router);//保留原来的
    app.use(express.static(path.join(__dirname, 'public')));
});

var mongoosedb = require('./model/db.js');
var db = mongoosedb.connect();
	
app.configure('development', function () {
    app.use(express.errorHandler());
});

routes(app);//

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

var express = require("express");
var redis = require("redis");
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var redisStore = require("connect-redis")(session);

//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var customers = require('./routes/customers');

var client = redis.createClient();//CREATE REDIS CLIENT
var app = express();
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cookieParser('dj*&#^$%fjhd'));
app.use(session(
    {
        secret: 'djej(@&#640_$*', 
        store: new redisStore({ host: 'localhost', port: 6379, client: client }),
        saveUninitialized: false, // don't create session until something stored,
        resave: false // don't save session if unmodified
    }
));

app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/', routes);
app.use('/users', users);
app.use('/customers', customers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(9000);


module.exports = app;

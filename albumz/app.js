var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var firebase = require('firebase');
firebase.database.enableLogging(true);
var config = {
    apiKey: "AIzaSyAjdTZqGAkmIMjooQvPswRoiyOW1b1rQEM",
    authDomain: "albumz-ae9e7.firebaseapp.com",
    databaseURL: "https://albumz-ae9e7.firebaseio.com",
    projectId: "albumz-ae9e7",
    storageBucket: "albumz-ae9e7.appspot.com",
    messagingSenderId: "820561012352"
};
firebase.initializeApp(config);

var fbRef = firebase.database().ref();

var routes = require('./routes/index');
var albums = require('./routes/albums');
var genres = require('./routes/genres');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', routes);
app.use('/albums', albums);
app.use('/genres', genres);
app.use('/users', users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), '0.0.0.0', function () {
    console.log('Server started on port: ' + app.get('port'));
})
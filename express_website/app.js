var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {title: 'Welcome'});
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.post('/contact/send', function(req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nicky.zj@gmail.com',
            pass: ''
        }
    });

    var mailOptions = {
        from: 'Nicky Zheng <nicky.zj@gmail.com>',
        to: 'nicky.zheng@techdata.com',
        subject: 'test',
        text: 'test text',
        html: '<p>You have a message:</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message send: ' + info.response);
            res.redirect('/');
        }
    });
});

app.listen(8080, '0.0.0.0');
console.log('Server is running on port 8080');
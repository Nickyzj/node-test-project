var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/show/:id', function( req, res, next ) {
    var posts = db.get('posts');

    posts.findById(req.params.id, function( err, post ) {
        res.render('show', { 'post': post });
    });
})

router.get('/add', function (req, res, next) {
    var categories = db.get('categories');

    categories.find({}, {}, function(err, categories) {
        res.render('addpost', {'title': 'Add Post', 'categories': categories})
    });
});

router.post('/add', upload.single('mainimage'), function (req, res, next) {
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;
    var author = req.body.author;
    var date = new Date();

    if (req.file) {
        var mainimage = req.file.filename;
    } else {
        var mainimage = "noimage.jpg";
    }

    req.checkBody('title', 'Title field is required.').notEmpty();
    req.checkBody('body', 'Body field is reqired').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        var categories = db.get('categories');

        categories.find({}, {}, function(err, categories) {
            res.render('addpost', {'title': 'Add Post', 'categories': categories, 'errors': errors})
        });

    } else {
        var posts = db.get('posts');
        posts.insert({
            "title": title,
            "body": body,
            "category": category,
            "date": date,
            "author": author,
            "mainimage": mainimage
        }, function (err, post) {
            if (err) {
                res.send(err);
            } else {
                req.flash('success', 'Post Added');
                res.location('/');
                res.redirect('/');
            }
        });
    }
});

router.post('/addcomment', function( req, res, next ) {
    var name = req.body.name;
    var email = req.body.email;
    var body = req.body.body;
    var postid = req.body.postid;
    var commentdate = new Date();

    console.log(name);
    console.log(email);
    console.log(body);
    console.log(postid);
    console.log(commentdate);

    req.checkBody('name', "Name field is required.").notEmpty();
    req.checkBody('email', "Email field is required.").notEmpty();
    req.checkBody('email', "Email is not formatted properly.").isEmail();
    req.checkBody('body', "Body field is required.").notEmpty();
    
    var errors = req.validationErrors();

    if( errors ) {
        var posts = db.get('posts');
        posts.findById(postid, function( req, res, next ) {
            res.render('show', { "errors": errors, "post": post});
        });
    } else {
        var comment = {
            "name": name,
            "email": email,
            "body": body,
            "commentdate": commentdate
        }

        var posts = db.get('posts');
        posts.update({
            "_id": postid
        }, {
            $push: {
                "comments": comment
            }
        }, function( err, doc ) {
            if( err ) {
                throw err;
            } else {
                req.flash('success', 'Comment Added');
                res.location('/posts/show/' + postid);
                res.redirect('/posts/show/' + postid);
            }
        });
    }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var fbRef = firebase.database().ref();
router.get('/', function (req, res, next) {
    res.render('genres/index');
});

router.get('/add', function (req, res, next) {
    res.render('genres/add');
});

//0: set {"path":"/genres/-L-GDL0iajasbuIopYtB","value":{"name":"xxx"},"priority":null}

router.post('/add', function (req, res, next) {
    var genre = {
        name: req.body.name
    };

    var genreRef = fbRef.child('genres');

    // genreRef.once('value', function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //         var childKey = childSnapshot.key();
    //         var childData = childSnapshot.val();
    //         console.log('key = ' + childKey);
    //         console.log('data = ' + childData);
    //         // ...
    //     });
    // });
    console.log(genre);
    // genreRef.push().set(genre);
    genreRef.set({kkk: 'mmm'});
    req.flash('success_msg', 'Genre Saved');
    res.redirect('/genres/add');
});

module.exports = router;
'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function( router ) {
    router.get('/', function( req, res ) {
        res.render('manage/index');
    });
    
    router.get('/books', function( req, res ) {
        Book.find({}, function( err, books ) {
            if( err ) {
                console.log(err);
            }
            var model = {
                books: books
            }
            res.render('manage/books/index', model);
        })
    });

    router.get('/books/add', function( req, res ) {
        Category.find({}, function( err, categories ) {
            if( err ) {
                console.log(err);
            }
            var model = {
                categories: categories 
            }
            res.render('manage/books/add', model);
        });
    });

    router.post('/books/add', function( req, res ) {
        var title = req.body.title && req.body.title.trim();
        var category = req.body.title && req.body.category.trim();
        var author = req.body.title && req.body.author.trim();
        var publisher = req.body.title && req.body.publisher.trim();
        var price = req.body.title && req.body.price.trim();
        var description = req.body.title && req.body.description.trim();
        var cover = req.body.title && req.body.cover.trim();

        if( title == '' || price == '' ) {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        var newBook = new Book({
            title: title,
            category: category,
            author: author,
            publisher: publisher,
            price: price,
            description: description,
            cover: cover,
        });

        newBook.save( function( err ) {
            if( err ) {
                console.log('save error', err);
            }
            req.flash('success', "Book Added");
            res.location('/manage/books');
            res.redirect('/manage/books');
        });
    });

    router.get('/books/edit/:id', function( req, res ) {
        Category.find({}, function( err, categories ) {
            Book.findOne({_id: req.params.id}, function( err, book ) {
                if( err ) {
                    console.log(err);
                }
                var model = {
                    book: book,
                    categories: categories
                };
                res.render('manage/books/edit', model);
            });
        });
    });

    router.post('/books/edit/:id', function( req, res ) {
        var title = req.body.title && req.body.title.trim();
        var category = req.body.title && req.body.category.trim();
        var author = req.body.title && req.body.author.trim();
        var publisher = req.body.title && req.body.publisher.trim();
        var price = req.body.title && req.body.price.trim();
        var description = req.body.title && req.body.description.trim();
        var cover = req.body.title && req.body.cover.trim();

        if( title == '' || price == '' ) {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/books/edit');
            res.redirect('/manage/books/edit');
        }

        Book.update({_id: req.params.id}, {
            title: title,
            category: category,
            author: author,
            publisher: publisher,
            price: price,
            description: description,
            cover: cover,
        }, function( err ) {
            if( err ) {
                console.log('update error', err);
            }
            req.flash('success', "Book Updated");
            res.location('/manage/books');
            res.redirect('/manage/books');
        });
    });

    router.post('/books/delete/:id', function( req, res ) {
        Book.remove({_id: req.params.id}, function( err ) {
            if( err ) {
                console.log(err);
            }
            req.flash('success', "Book Deleted");
            res.location('/manage/books');
            res.redirect('/manage/books');
        });
    });

    router.get('/categories', function( req, res ) {
        Category.find({}, function( err, categories ) {
            if( err ) {
                console.log(err);
            }
            var model = {
                categories: categories
            }
            res.render('manage/categories/index', model);
        });
    });

    router.get('/categories/add', function( req, res ) {
        res.render('manage/categories/add');
    });

    router.post('/categories/add', function( req, res ) {
        var name = req.body.name && req.body.name.trim();
        if( name == '' ) {
            req.flash('error', "Please fill out the category name");
            res.location('/manage/categories/add');
            res.redirect('/manage/categories/add');
        }
        var newCategory = new Category({
            name: name
        });
        newCategory.save( function( err ) {
            if( err ) {
                console.log(err);
            }
            req.flash('success', "Category Added");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });

    router.get('/categories/edit/:id', function( req, res) {
        Category.findOne({_id: req.params.id}, function( err, category ) {
            if( err ) {
                console.log(err);
            }
            var model = {
                category: category
            }
            res.render('manage/categories/edit', model);
        });
    });

    router.post('/categories/edit/:id', function( req, res ) {
        var name = req.body.name && req.body.name.trim();
        if( name == '' ) {
            req.flash('error', "Please fill out the category name");
            res.location('/manage/categories/edit');
            res.redirect('/manage/categories/edit');
        }
        Category.update({_id: req.params.id}, {
            name: name
        }, function( err ) {
            if( err ) {
                console.log('update error', err);
            }
            req.flash('success', 'Category Updated');
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });

    router.post('/categories/delete/:id', function( req, res ) {
        Category.remove({_id: req.params.id}, function( err ) {
            if( err ) {
                console.log('err');
            }
            req.flash('success', 'Category deleted');
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });
}
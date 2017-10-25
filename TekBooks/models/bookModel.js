'use strict';

var mongoose = require('mongoose');

var bookMode = function() {
    var bookSchema = mongoose.Schema({
        title: String,
        category: String,
        description: String,
        author: String,
        publisher: String,
        price: Number,
        cover: String,
    });

    bookSchema.methods.truncText = function( lenght ) {
        return this.description.substring(0, lenght);
    };

    return mongoose.model('Book', bookSchema);
}

module.exports = new bookMode();
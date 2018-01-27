'use strict';

const db = require('./models');

const mongoose = require('mongoose');



var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI, {});

db.mongoose = mongoose;

function test (db) {
    var data = {
        title: "Sample Article",
        date: "June 10, 1200",
        link: "emptyurl",
        description: "Nothing"
    }


    db.Article.create(data, function (error) {

        if (error) {
            console.log(error)
        } else {
            console.log('Completed request');
        }

    });

}

module.exports = db;
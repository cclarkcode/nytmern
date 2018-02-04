'use strict';

const db = require('./models');

const mongoose = require('mongoose');



var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI, {});

db.mongoose = mongoose;

function test (db) {
    const newarticle = new db.Article({
        title: "Sample Article",
        date: "June 10, 1200",
        link: "emptyurl",
        description: "Nothing"
    });

    console.log(typeof newarticle);

    var data = {
        name: 'Default',
        active: true
    }

    var data1 = {
        name: 'Other',
        active: false
    }


    db.List.create(data, function (error,response) {

        if (error) {
            console.log(error)
        } else {
            response.articles.push(newarticle);
            response.save(function() {
                console.log('Article saved in list');
            }); 
        }

    });

    db.List.create(data1, function (error,response) {

        if (error) {
            console.log(error)
        } else {
            response.articles.push(newarticle);
            response.save(function() {
                console.log('Article saved in list');
            }); 
        }

    });

}

    // test(db);

module.exports = db;
'use strict';
console.log('Model loaded');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    date: String,
    link: String,
    byline: String
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
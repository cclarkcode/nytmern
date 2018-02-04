'use strict';
console.log('Model loaded');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    name: String,
    active: Boolean,
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Article"
        }
    ]
});

const List = mongoose.model('List', ListSchema);
module.exports = List;
const mongooes = require('mongoose');
const Schema   = mongooes.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: [20, '`{PATH}` area max length should less than (`{MAXLENGTH}`) (`{VALUE}`). '],
        minlength: [2, '`{PATH}` area min length should greater than (`{MINLENGTH}`) (`{VALUE}`). ']
        //unique: true
    },
    comments: [{message: String}],
    year: {
        type: Number,
        max: 2030,
        min: 1700
    },
    meta: {
        votes: Number,
        favs: Number
    },
    published: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongooes.model('book', BookSchema);
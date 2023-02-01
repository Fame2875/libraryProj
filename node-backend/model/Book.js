const mongoose = require('mongoose')
const Schema = mongoose.Schema
// npm init & npm i express cors body-parser mongoose
let Book = new Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    description: {
        type: String
    }
}, {
    collection: 'books'
})

module.exports = mongoose.model('Book', Book);
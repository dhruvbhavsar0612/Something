const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Author',authorSchema) // 'Author is a name giver by us
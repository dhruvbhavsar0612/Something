if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine','ejs') //setting the view engine here ejs
app.set('views',__dirname,'/views')// telling the app where our views are gonna be coming from, here ../views
app.set('layout', './views/layouts/layout') //every single file is put inside this llayout file
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
// mongo db part

const mongoose = require('mongoose')//importing mongoose as in mongodb
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',()=>{
    console.log('connected to mongoose')
})

app.use('/',indexRouter) // telling app to use the routes from indexRouter
app.use('/authors',authorRouter) //means our route looks like '/authors/'
app.use('/books',bookRouter )
app.listen(process.env.PORT || 3001)
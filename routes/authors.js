const express = require('express')
const Author = require('../models/author')
const router = express.Router()

//all authors routes, basic route is /author/...    
router.get('/',async (req,res)=>{
    let searchOptions = {}
    if(req.query.name!= null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('./views/authors/index', {authors: authors, searchOptions:req.query})
    }catch{
        res.redirect('/')
    }
})

//new authors routes
router.get('/new',(req,res)=>{
    res.render('./views/authors/new', {author: new Author()})
})

//create author route
router.post('/', async (req,res)=>{
    const author = new Author({
        name:req.body.name
    })
    try{
        const newAuthor = await author.save()
        res.redirect('authors')
        // res.redirect(`authors/${newAuthor.id}`)
    }catch{
        res.render('./views/authors/new',{
            author:author,
            errorMsg:'Error creating the author'
        })
    }
})

module.exports = router
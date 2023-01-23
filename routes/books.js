const express= require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')
const multer = require('multer')
const path = require('path')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['images/jpeg','images/png','images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req,file,callback)=>{
        callback(null, )
    }
})

router.get('/',async (req,res)=>{
    // let searchOptions ={}
    // if(req.query.title != null && req.query.title !== ''){
    //     searchOptions.name = new RegExp(req.query.title, 'i')
    //     // 'i' is used so search becomes case insensitive

    // }
    // try{
    //     const books = await Books.find(searchOptions)
    //     res.render('books/index',{
    //         books:books,
    //         searchOptions:req.query
    //     })

    // }catch{
    //     res.redirect('/')
    // }
    res.send('All books')
})


//new book route 
router.get('/new',async(req,res)=>{
    renderNewPage(res, new Book())
})

//create book route
router.post('/', upload.single('cover') ,async (req,res)=>{
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title:req.body.title,
        author:req.body.author,
        publisheDate:new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName:fileName,
        description:req.body.desc
    })
    try{
        const newBook = await book.save()
        res.redirect('books')
        // res.redirect(`books/!{newBook.id}`)
    }catch{
        renderNewPage(res, book , true)
    }
})

//call back renderNewPage
const renderNewPage = async (res,book,hasError = false) =>{
    try{
        const authors = await Author.find({})
        const book = new Book()
        const params = {
            authors:authors,
            book:book
        }
        if(hasError){
            params.errorMsg = 'error creating the book'
        }
        res.render('./views/books/new', params)
    }
    catch{
        res.redirect('/books')
    }
}

module.exports = router
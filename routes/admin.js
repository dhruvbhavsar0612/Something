const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')

//all admin routes, basic route is admin/
router.post('/',async (req,res)=>{
    const admin = new Admin({
        name:req.body.name
    })

    try{
        const newAdmin = await admin.save()
        res.redirect('login')
    }catch{
        res.render('./views/admin/admin',{
            admin:admin,
            errorMsg:'Error creating the author'
        })
    }
})

module.exports = router
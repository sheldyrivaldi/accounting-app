const express = require('express')
const router = express.Router()
const db = require('../config/mysql')
const categoriesc = require('../config/categoriesc')
const validation = require('../validation/categoriesv')
router.use(express.json())
router.use(validation)
router.get('/', (req, res)=>{
    categoriesc.getAllCategories(db, res)
})

router.get('/search', (req, res)=>{
    categoriesc.getCategory(db, req, res)
})

router.post('/', (req, res)=>{
    categoriesc.createCategory(db, req, res)
})
router.put('/:id', (req, res)=>{
    categoriesc.updateCategory(db, req, res)
})
router.delete('/:id', (req, res)=>{
    categoriesc.deleteCategory(db, req, res)
})



module.exports = router
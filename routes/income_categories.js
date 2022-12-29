const express = require('express')
const router = express.Router()
const incomecatc = require('../config/income_categoriesc')
const db = require('../config/mysql')
router.use(express.json())

router.get('/', (req, res) => {
    incomecatc.getIncomeCategories(db, res)
})
router.get('/:id', (req, res)=>{
    incomecatc.getIncomeCategory(db, req, res)
})
router.post('/', (req, res)=>{
    incomecatc.createIncomeCategory(db, req, res)
})
router.put('/:id', (req, res)=>{
    incomecatc.updateIncomeCategory(db, req, res)
})
router.delete('/:id', (req, res)=>{
    incomecatc.deleteIncomeCategory(db, req, res)
})

module.exports = router
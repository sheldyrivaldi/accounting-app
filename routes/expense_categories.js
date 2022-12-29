const express = require('express')
const router = express.Router()
const expensecatc = require('../config/expense_categoriesc')
const db = require('../config/mysql')
router.use(express.json())

router.get('/', (req, res) => {
    expensecatc.getExpenseCategories(db, res)
})
router.get('/:id', (req, res)=>{
    expensecatc.getExpenseCategory(db, req, res)
})
router.post('/', (req, res)=>{
    expensecatc.createExpenseCategory(db, req, res)
})
router.put('/:id', (req, res)=>{
    expensecatc.updateExpenseCategory(db, req, res)
})
router.delete('/:id', (req, res)=>{
    expensecatc.deleteExpenseCategory(db, req, res)
})

module.exports = router
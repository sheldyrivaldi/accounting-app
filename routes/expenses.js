const express = require('express')
const router = express.Router()
const db = require('../config/mysql')
const expensesc = require('../config/expensesc')
const validation = require('../validation/expensesv')
router.use(express.json())
router.use(validation)

router.get('/', (req, res)=>{
    expensesc.getAllExpense(db, res)
})

router.get('/search', (req, res)=>{
    if(expensesc.idQuery(req) != undefined){
        return expensesc.getExpense(db, res, "id", expensesc.idQuery(req))
    }
    if(expensesc.expenseNameQuery(req) != undefined){
        return expensesc.getExpense(db, res, "expense_name", expensesc.expenseNameQuery(req))
    }
    if(expensesc.priceQuery(req) != undefined){
        return expensesc.getExpense(db, res, "price", expensesc.priceQuery(req))
    }
    if(expensesc.dateQuery(req) != undefined){
        return expensesc.getExpense(db, res, "date", expensesc.dateQuery(req))
    }
})

router.post('/', (req, res)=>{
    expensesc.createExpense(db, req, res)
})

router.delete('/search', (req, res)=>{
    expensesc.deleteExpense(db, req, res)
})



module.exports = router
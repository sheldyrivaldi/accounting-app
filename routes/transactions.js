const express = require('express')
const router = express.Router()
const db = require('../config/mysql')
const transactionsc = require('../config/transactionsc')
const validation = require('../validation/transactionsv')
router.use(express.json())
router.use(validation)

router.get('/', (req, res)=>{
    transactionsc.getAllTransactions(db,res)
})

router.get('/search', (req, res)=>{
    if (transactionsc.idQuery(req) != undefined){
        return transactionsc.getTransaction(db, res, "id", transactionsc.idQuery(req))
    }
    if (transactionsc.productNameQuery(req) != undefined){
        return transactionsc.getTransaction(db, res, "product_name", transactionsc.productNameQuery(req))
    }
    if (transactionsc.categoryQuery(req) != undefined){
        return transactionsc.getTransaction(db, res, "category", transactionsc.categoryQuery(req))
    }
    if (transactionsc.priceQuery(req) != undefined){
        return transactionsc.getTransaction(db, res, "price", transactionsc.priceQuery(req))
    }
    if (transactionsc.quantityQuery(req) != undefined){
        return transactionsc.getTransaction(db, res, "quantity", transactionsc.quantityQuery(req))
    }
    if (transactionsc.totalQuery(req) != undefined){
        return transactionsc.getTransaction(db, res, "total", transactionsc.totalQuery(req))
    }
    if (transactionsc.transactionDateQuery(req) != undefined){
        return transactionsc.getTransaction(db, res, "transaction_date", transactionsc.transactionDateQuery(req))
    }
})

router.post('/', (req, res)=>{
    transactionsc.createTransactions(db, req, res)
})





module.exports = router
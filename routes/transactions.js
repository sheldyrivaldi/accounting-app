const express = require('express')
const router = express.Router()
const trx = require('../config/transactionsc')
const db = require('../config/mysql')
router.use(express.json())

router.get('/', (req, res, next) => {
    trx.getAllTransactions(db, res)
})
router.get('/:id', (req, res) => {
    trx.getTransaction(db, req, res)
})
router.post('/', (req, res) => {
    trx.createTransaction(db, req, res)
})
router.put('/:id', (req, res) => {
    trx.updateTransaction(db, req, res)
})
router.delete('/:id', (req, res) => {
    trx.deleteTransaction(db, req, res)
})

module.exports = router

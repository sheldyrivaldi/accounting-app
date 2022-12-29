const express = require('express')
const router = express.Router()
const walletsc = require('../config/walletsc')
const db = require('../config/mysql')
router.use(express.json())


router.get('/', (req, res)=>{
    walletsc.getAllWallets(db, res)
})

router.get('/:id', (req, res)=>{
    walletsc.getWallet(db, req, res)
})
router.post('/', (req, res)=>{
    walletsc.createWallet(db, req, res)
})
router.put('/:id', (req, res)=>{
    walletsc.updateWallet(db, req, res)
})
router.delete('/:id', (req, res)=>{
    walletsc.deleteWallet(db, req, res)
})

module.exports = router
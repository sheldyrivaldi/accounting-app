const express = require('express')
const app = express()
const db = require('../config/mysql')
const trc = require('../config/transactionsc')
app.use(express.json())

app.post('/', (req, res, next)=>{
    if(typeof(trc.productNameBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Input product name as string."
        })
    }
    if(typeof(trc.categoryBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Input category as string."
        })
    }
    if(typeof(trc.priceBody(req)) != "number"){
        return res.status(400).json({
            message: "Bad request! Input price as number."
        })
    }
    if(trc.priceBody(req) <=0){
        return res.status(400).json({
            message: `Bad request! Please input price above 0.`
        })
    }
    if(typeof(trc.quantityBody(req)) != "number"){
        return res.status(400).json({
            message: "Bad request! Input quantity as number."
        })
    }
    if(trc.quantityBody(req) <=0){
        return res.status(400).json({
            message: `Bad request! Please input quantity above 0.`
        })
    }
    if(typeof(trc.totalBody(req)) != "number"){
        return res.status(400).json({
            message: "Bad request! Input total as number."
        })
    }
    if(trc.totalBody(req) <=0){
        return res.status(400).json({
            message: `Bad request! Please input total above 0.`
        })
    }

    db.query(`SELECT * FROM products WHERE product_name = "${trc.productNameBody(req)}";`, function (err, products) {
        if (err) throw err
        if (products.length <= 0) {
            return res.status(404).json({message: "Product not found!"})
        } else{
            db.query(`SELECT * FROM categories WHERE category_name = "${trc.categoryBody(req)}";`, function (err, categories) {
                if (err) throw err
                if (categories.length <= 0) {
                    return res.status(404).json({message: "Categories not found!"})
                } else{
                    next()
                }
            })
        }
    })
})


app.use('/search', (req, res, next)=>{
    if(trc.idQuery(req) <= 0){
        return res.status(400).json({
            message: `Bad request! Please input id above 0.`
        })
    }
    if(trc.productNameQuery(req) > 144){
        return res.status(400).json({
            message: `Bad request! Input product name max 144 charachters.`
        })
    }
    if(trc.categoryQuery(req) > 144){
        return res.status(400).json({
            message: `Bad request! Input category max 144 charachters.`
        })
    }
    if(trc.priceQuery(req) <= 0){
        return res.status(400).json({
            message: `Bad request! Please input price above 0.`
        })
    }
    if(trc.quantityQuery(req) <= 0){
        return res.status(400).json({
            message: `Bad request! Please input quantity above 0.`
        })
    }
    if(trc.totalQuery(req) <= 0){
        return res.status(400).json({
            message: `Bad request! Please input total above 0.`
        })
    }
    if (trc.idQuery(req) != undefined){
        db.query(`SELECT * FROM transactions WHERE id = "${trc.idQuery(req)}";`, function (err, transactions) {
            if (err) throw err
            if (transactions.length <= 0) {
                return res.status(404).json({message: "Transactions not found!"})
            } else {
                next()
            }
        })
    }
    if (trc.productNameQuery(req) != undefined){
        db.query(`SELECT * FROM transactions WHERE product_name = "${trc.productNameQuery(req)}";`, function (err, transactions) {
            if (err) throw err
            if (transactions.length <= 0) {
                return res.status(404).json({message: "Transactions not found!"})
            } else {
                next()
            }
        })
    }
    if (trc.categoryQuery(req) != undefined){
        db.query(`SELECT * FROM transactions WHERE category = "${trc.categoryQuery(req)}";`, function (err, transactions) {
            if (err) throw err
            if (transactions.length <= 0) {
                return res.status(404).json({message: "Transactions not found!"})
            } else {
                next()
            }
        })
    }
    if (trc.priceQuery(req) != undefined){
        db.query(`SELECT * FROM transactions WHERE price = "${trc.priceQuery(req)}";`, function (err, transactions) {
            if (err) throw err
            if (transactions.length <= 0) {
                return res.status(404).json({message: "Transactions not found!"})
            } else {
                next()
            }
        })
    }
    if (trc.quantityQuery(req) != undefined){
        db.query(`SELECT * FROM transactions WHERE quantity = "${trc.quantityQuery(req)}";`, function (err, transactions) {
            if (err) throw err
            if (transactions.length <= 0) {
                return res.status(404).json({message: "Transactions not found!"})
            } else {
                next()
            }
        })
    }
    if (trc.totalQuery(req) != undefined){
        db.query(`SELECT * FROM transactions WHERE total = "${trc.totalQuery(req)}";`, function (err, transactions) {
            if (err) throw err
            if (transactions.length <= 0) {
                return res.status(404).json({message: "Transactions not found!"})
            } else {
                next()
            }
        })
    }
})


module.exports = app
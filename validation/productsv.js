const express = require('express')
const app = express()
const db = require('../config/mysql')
const productsc = require('../config/productsc')
app.use(express.json())

app.post('/', (req, res, next)=>{
    if(productsc.idBody(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input id above 0"
        })
    }
    if(typeof(productsc.productNameBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Input product name as string."
        })
    }
    if(productsc.productNameBody(req).length <= 0 || productsc.productNameBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Product name is not null and max 144 charachters."
        })
    }
    if(typeof(productsc.productCodeBody(req)) != "string" ){
        return res.status(400).json({
            message: "Bad request! Input product code as string."
        })
    }
    if(productsc.productCodeBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Product code max 144 charachters."
        })
    }
    if(typeof(productsc.barcodeBody(req)) != "string" ){
        return res.status(400).json({
            message: "Bad request! Input barcode as string."
        })
    }
    if(productsc.barcodeBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Input barcode max 144 charachters."
        })
    }
    if(typeof(productsc.categoryBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Input category as string."
        })
    }
    if(productsc.categoryBody(req) > 144){
        return res.status(400).json({
            message: "Bad request! Input category max 144 charachters."
        })
    }
    if(typeof(productsc.sellingPriceBody(req)) != "number"){
        return res.status(400).json({
            message: "Bad request! Input selling price as integer."
        })
    }
    if(productsc.sellingPriceBody(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input selling price above 0"
        })
    }
    if(productsc.quantityBody(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input quantity above 0"
        })
    }
    if(typeof(productsc.quantityBody(req)) != "number"){
        return res.status(400).json({
            message: "Bad request! Input quantity as integer."
        })
    }
    db.query(`SELECT * FROM categories WHERE category_name = "${productsc.categoryBody(req)}";`, function (err, categories) {
        if (err) throw err
        if (categories.length <= 0) {
            return res.status(404).json({message: "Category not found!"})
        } else {
            
    db.query(`SELECT * FROM products WHERE product_name = "${productsc.productNameBody(req)}";`, function (err, products) {
        if (err) throw err
        if (products.length >= 1) {
            return res.status(404).json({message: "Product duplicate!"})
        }
        else {
            next()
        }
    })
        }
    })

})


app.put('/', (req, res, next)=>{
    if(productsc.idBody(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input id above 0"
        })
    }
    if(typeof(productsc.idBody(req)) != "number"){
        return res.status(400).json({
            message: "Bad request! Input id as integer."
        })
    }
    if(typeof(productsc.productNameBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Input product name as string."
        })
    }
    if(productsc.productNameBody(req).length <= 0 || productsc.productNameBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Product name is not null and max 144 charachters."
        })
    }
    if(typeof(productsc.productCodeBody(req)) != "string" ){
        return res.status(400).json({
            message: "Bad request! Input product code as string."
        })
    }
    if(productsc.productCodeBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Product code max 144 charachters."
        })
    }
    if(typeof(productsc.barcodeBody(req)) != "string" ){
        return res.status(400).json({
            message: "Bad request! Input barcode as string."
        })
    }
    if(productsc.barcodeBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Input barcode max 144 charachters."
        })
    }
    if(typeof(productsc.categoryBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Input category as string."
        })
    }
    if(productsc.categoryBody(req) > 144){
        return res.status(400).json({
            message: "Bad request! Input category max 144 charachters."
        })
    }
    if(typeof(productsc.sellingPriceBody(req)) != "number"){
        return res.status(400).json({
            message: "Bad request! Input selling price as integer."
        })
    }
    if(productsc.sellingPriceBody(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input selling price above 0"
        })
    }
    if(productsc.quantityBody(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input quantity above 0"
        })
    }
    if(typeof(productsc.quantityBody(req)) != "number"){
        return res.status(400).json({
            message: "Bad request! Input quantity as integer."
        })
    }
    db.query(`SELECT * FROM categories WHERE category_name = "${productsc.categoryBody(req)}";`, function (err, categories) {
        if (err) throw err
        if (categories.length <= 0) {
            return res.status(404).json({message: "Category not found!"})
        } else {
            next()
        }
    })
})

app.use('/search',(req, res, next)=>{

    if(productsc.idQuery(req) <= 0 ){
        return res.status(400).json({
            message: `Bad request! Please input id above 0.`
        })
    }
    if(productsc.sellingPriceQuery(req) <= 0 ){
        return res.status(400).json({
            message: `Bad request! Please input selling price above 0.`
        })
    }
    if(productsc.quantityQuery(req) <= 0 ){
        return res.status(400).json({
            message: `Bad request! Please input quantity above 0.`
        })
    }
    if(productsc.productNameQuery(req) > 144){
        return res.status(400).json({
            message: `Bad request! Input product name max 144 charachters.`
        })
     }
     if(productsc.productCodeQuery(req) > 144){
        return res.status(400).json({
            message: `Bad request! Input product code max 144 charachters.`
        })
     }
     if(productsc.barcodeQuery(req) > 144){
        return res.status(400).json({
            message: `Bad request! Input barcode max 144 charachters.`
        })
     }
     if(productsc.categoryQuery(req) > 144){
        return res.status(400).json({
            message: `Bad request! Input category max 144 charachters.`
        })
     }
     if (productsc.productNameQuery(req) != undefined){
        db.query(`SELECT * FROM products WHERE product_name = "${productsc.productNameQuery(req)}";`, function (err, products) {
            if (err) throw err
            if (products.length <= 0) {
                return res.status(404).json({message: "Product not found!"})
            } else {
                next()
            }
        })
    } 
    if (productsc.idQuery(req) != undefined){
        db.query(`SELECT * FROM products WHERE id = "${productsc.idQuery(req)}";`, function (err, products) {
            if (err) throw err
            if (products.length <= 0) {
                return res.status(404).json({message: "Product not found!"})
            } else {
                next()
            }
        })
    }
    if (productsc.productCodeQuery(req) != undefined){
        db.query(`SELECT * FROM products WHERE product_code = "${productsc.productCodeQuery(req)}";`, function (err, products) {
            if (err) throw err
            if (products.length <= 0) {
                return res.status(404).json({message: "Product not found!"})
            } else {
                next()
            }
        })
    }
    if (productsc.barcodeQuery(req) != undefined){
        db.query(`SELECT * FROM products WHERE barcode = "${productsc.barcodeQuery(req)}";`, function (err, products) {
            if (err) throw err
            if (products.length <= 0) {
                return res.status(404).json({message: "Product not found!"})
            } else {
                next()
            }
        })
    }
    if (productsc.categoryQuery(req) != undefined){
        db.query(`SELECT * FROM products WHERE category = "${productsc.categoryQuery(req)}";`, function (err, products) {
            if (err) throw err
            if (products.length <= 0) {
                return res.status(404).json({message: "Product not found!"})
            } else {
                next()
            }
        })
    }
    if (productsc.sellingPriceQuery(req) != undefined){
        db.query(`SELECT * FROM products WHERE selling price = "${productsc.sellingPriceQuery(req)}";`, function (err, products) {
            if (err) throw err
            if (products.length <= 0) {
                return res.status(404).json({message: "Product not found!"})
            } else {
                next()
            }
        })
    }
    if (productsc.quantityQuery(req) != undefined){
        db.query(`SELECT * FROM products WHERE quantity = "${productsc.quantityQuery(req)}";`, function (err, products) {
            if (err) throw err
            if (products.length <= 0) {
                return res.status(404).json({message: "Product not found!"})
            } else {
                next()
            }
        })
    }
})


module.exports = app
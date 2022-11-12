const express = require('express')
const router = express.Router()
const db = require('../config/mysql')
const productsc = require('../config/productsc')
const validation = require('../validation/productsv')
router.use(express.json())
router.use(validation)

//Getlist all of products
router.get('/', (req, res)=> {
    productsc.getAllProducts(db,res)
    
})

// Get a products by filter query
router.get('/search', (req, res)=> {
    if (productsc.productNameQuery(req) != undefined){
        return productsc.getProduct(db, res, "product_name", productsc.productNameQuery(req))
    } 
    if (productsc.idQuery(req) != undefined){
        return productsc.getProduct(db, res, "id", productsc.idQuery(req))
    }
    if (productsc.productCodeQuery(req) != undefined){
        return productsc.getProduct(db, res, "product_code", productsc.productCodeQuery(req))
    }
    if (productsc.barcodeQuery(req) != undefined){
        return productsc.getProduct(db, res, "barcode", productsc.barcodeQuery(req))
    }
    if (productsc.categoryQuery(req) != undefined){
        return productsc.getProduct(db, res, "category", productsc.categoryQuery(req))
    }
    if (productsc.sellingPriceQuery(req) != undefined){
        return productsc.getProduct(db, res, "selling_price", productsc.sellingPriceQuery(req))
    }
    if (productsc.quantityQuery(req) != undefined){
        return productsc.getProduct(db, res, "quantity", productsc.quantityQuery(req))
    }
})
// Update a product
router.put('/', (req, res)=> {
    productsc.updateProduct(db, req, res)
})

// Create a product
router.post('/', (req, res) => {
    productsc.createProduct(db, req, res)
})

// Delete a product
router.delete('/search', (req, res)=>{
    productsc.deleteProduct(db, req, res)
})



module.exports = router
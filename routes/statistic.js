const express = require('express')
const router = express.Router()
const db = require('../config/mysql')
const categoriesc = require('../config/categoriesc')
const productsc = require('../config/productsc')
const trx = require('../config/transactionsc')
router.use(express.json())

router.get('/categories',(req, res)=>{
    let sql = `select
    (select count(id) from transactions where category = "Common-Needs") / (select count(id) as ff from transactions) * 100 as common_needs,
    (select count(id) from transactions where category = "Foods") / (select count(id) as ff from transactions) * 100 as foods,
    (select count(id) from transactions where category = "Beverage") / (select count(id) as ff from transactions) * 100 as beverage;`
    db.query(sql, function(err, statistic){
        if (err) throw err
        res.status(200).json(statistic)
    })
})

router.get('/products',(req, res)=>{
    let sql = `select
    (select sum(quantity) from transactions where product_name = "Indomie") as Indomie ,
    (select sum(quantity) from transactions where product_name = "Egg") as Egg ,
    (select sum(quantity) from transactions where product_name = "Nugget") as Nugget,
    (select sum(quantity) from transactions where product_name = "Snack") as Snack,
    (select sum(quantity) from transactions where product_name = "Rinso") as Rinso,
    (select sum(quantity) from transactions where product_name = "Soap") as Soap,
    (select sum(quantity) from transactions where product_name = "Close-Up") as Close_Up,
    (select sum(quantity) from transactions where product_name = "Shampoo") as Shampoo,
    (select sum(quantity) from transactions where product_name = "Sunlight") as Sunlight,
    (select sum(quantity) from transactions where product_name = "Stella") as Stella,
    (select sum(quantity) from transactions where product_name = "Superpel") as Superpel,
    (select sum(quantity) from transactions where product_name = "Tissue") as Tissue,
    (select sum(quantity) from transactions where product_name = "Tea") as Tea,
    (select sum(quantity) from transactions where product_name = "Yakult") as Yakult,
    (select sum(quantity) from transactions where product_name = "Pocari") as Pocari;`
    db.query(sql, function(err, statistic){
        if (err) throw err
        res.status(200).json(statistic)
    })
})


module.exports = router
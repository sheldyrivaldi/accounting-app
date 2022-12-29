const express = require('express')
const app = express()
const db = require('../config/mysql')
const trc = require('../config/transactionsc')
app.use(express.json())

app.post('/', (req, res, next)=>{
    if(!req.body.title || !req.body.type || !req.body.category_name || !req.body.amount || !req.body.wallet){
        return res.status(400).json({
            message: "Error! Please input title, type, category_name, amount, and wallet!"
        })
    }
    if(typeof(req.body.title) != "string"){
        return res.status(400).json({
            message: "Error! Please input title as string!."
        })
    }
    if(typeof(req.body.type) != "string"){
        return res.status(400).json({
            message: "Error! Please input type as string!."
        })
    }
    if(req.body.type.toLowerCase() != "income" && req.body.type.toLowerCase() != "expense"){
        return res.status(400).json({
            message: "Error! Please input type with income or expense"
        })
    }
    if(typeof(req.body.category_name) != "string"){
        return res.status(400).json({
            message: "Error! Please input category_name as string!."
        })
    }
    if(typeof(req.body.amount) != "number" || req.body.amount <= 0){
        return res.status(400).json({
            message: `Error! Please input amount as number and above 0!.`
        })
    }
    if(typeof(req.body.wallet) != "string"){
        return res.status(400).json({
            message: "Error! Please input wallet as string!."
        })
    }
    if(req.body.type.toLowerCase() == "income"){
        db.query(`SELECT * FROM income_categories WHERE category_name = "${req.body.category_name}";`, function(err, income_cataegories){
            if (err) throw err
            if (income_cataegories.length <= 0){
                return res.status(404).json({
                    message: "Error! Category not found!"
                })
            }
        })
    }
    if(req.body.type.toLowerCase() == "expense"){
        db.query(`SELECT * FROM expense_categories WHERE category_name = "${req.body.category_name}";`, function(err, expense_cataegories){
            if (err) throw err
            if (expense_cataegories.length <= 0){
                return res.status(404).json({
                    message: "Error! Category not found!"
                })
            }
        })
    }
    db.query(`SELECT * FROM wallets WHERE wallet_name = "${req.body.wallet}";`, function (err, wallet) {
        if (err) throw err
        if (wallet.length <= 0) {
            return res.status(404).json({message: "Error! Wallet not found!"})
        } else {
            next()
        }
    })
})

   
app.use('/:id', (req,res,next)=>{
    if(!req.params.id){
        return res.status(400).json({
            message: "Error! Please input id!"
        })
    }
    if(parseInt(req.params.id).toString() == "NaN"){
        return res.status(400).json({
            message: "Error! Please input id as number!" 
        })
    }
    if(req.params.id <= 0){
        return res.status(400).json({
            message: "Error! Please input id above 0!"
        })
    }
    db.query(`select * from transactions where id = ${req.params.id}`, function(err, result){
            if (err) throw err
            if (result.length <= 0){
                return res.status(404).json({
                    message: "Error! Transaction not found!"
                })
            } else {
                next()
            }
        })

    
})


app.put('/', (req, res, next)=>{
    let regex = new RegExp(/^\d{4}\-\d{2}-\d{2}$/)
    if(!req.body.title || !req.body.type || !req.body.category_name || !req.body.amount || !req.body.wallet || !req.body.transaction_date){
        return req.status(400).json({
            message: "Error! Please input title, type, category_name, amount, wallet, and transaction_date!"
        })
    }
    if(typeof(req.body.title) != "string"){
        return res.status(400).json({
            message: "Error! Please input title as string!."
        })
    }
    if(typeof(req.body.type) != "string"){
        return res.status(400).json({
            message: "Error! Please input type as string!."
        })
    }
    if(req.body.type.toLowerCase() != "income" && req.body.type.toLowerCase() != "expense"){
        return res.status(400).json({
            message: "Error! Please input type with income or expense"
        })
    }
    if(typeof(req.body.category_name) != "string"){
        return res.status(400).json({
            message: "Error! Please input category_name as string!."
        })
    }
    if(typeof(req.body.amount) != "number" || req.body.amount <= 0){
        return res.status(400).json({
            message: `Error! Please input amount as number and above 0!.`
        })
    }
    if(typeof(req.body.wallet) != "string"){
        return res.status(400).json({
            message: "Error! Please input wallet as string!."
        })
    }
    if(regex.test(req.body.transaction_date) == false){
        return res.status(400).json({
            message: "Error! Please input date according to the format YYYY-MM-DD!"
        })
    }
    if(!req.body.type.toLowerCase() == "income"){
        db.query(`SELECT * FROM income_categories WHERE category_name = "${req.body.category_name}";`, function(err, income_cataegories){
            if (err) throw err
            if (income_cataegories.length <= 0){
                return res.status(404).json({
                    message: "Error! Category not found!"
                })
            }
        })
    }
    if(req.body.type.toLowerCase() == "expense"){
        db.query(`SELECT * FROM expense_categories WHERE category_name = "${req.body.category_name}";`, function(err, expense_cataegories){
            if (err) throw err
            if (expense_cataegories.length <= 0){
                return res.status(404).json({
                    message: "Error! Category not found!"
                })
            }
        })
    }
    
    db.query(`SELECT * FROM wallets WHERE wallet_name = "${req.body.wallet}";`, function (err, wallet) {
        if (err) throw err
        if (wallet.length <= 0) {
            return res.status(404).json({message: "Error! Wallet not found!"})
        } else {
            next()
        }
    })
})


module.exports = app
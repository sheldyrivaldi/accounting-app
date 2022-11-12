const express = require('express')
const app = express()
const db = require('../config/mysql')
const exp = require('../config/expensesc')
app.use(express.json())

app.post('/',(req, res, next)=>{
    if(exp.idBody(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input id above 0."
        })
    }
    if(typeof(exp.idBody(req)) != "number"){
        return res.status(400).json({
            message: "bad request! Please input id as number."
        })
    }
    if(exp.expenseNameBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Expense name max 144 characters."
        })
    }
    if(typeof(exp.expenseNameBody(req)) != "string"){
        return res.status(400).json({
            message: "bad request! Please input expense name as string."
        })
    }
    if(exp.priceBody(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input price above 0."
        })
    }
    if(typeof(exp.priceBody(req)) != "number"){
        return res.status(400).json({
            message: "bad request! Please input price as number."
        })
    }
})

app.use('/search', (req, res, next)=>{
    if(exp.idQuery(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input id above 0."
        })
    }
    if(exp.expenseNameQuery(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Expense name max 144 characters."
        })
    }
    if(exp.priceQuery(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input price above 0."
        })
    }
    if(exp.idQuery(req) != undefined){
        db.query(`SELECT * FROM expenses WHERE id = ${exp.idQuery(req)};`, function(err, expenses){
            if (expenses.length <= 0) {
                return res.status(404).json({message: "Expense not found!"})
            } else {
                next()
            }
        })
    }
    if(exp.expenseNameQuery(req) != undefined){
        db.query(`SELECT * FROM expenses WHERE expense_name = "${exp.expenseNameQuery(req)}";`, function(err, expenses){
            if (expenses.length <= 0) {
                return res.status(404).json({message: "Expense not found!"})
            } else {
                next()
            }
        })
    }
    if(exp.priceQuery(req) != undefined){
        db.query(`SELECT * FROM expenses WHERE price = ${exp.priceQuery(req)};`, function(err, expenses){
            if (expenses.length <= 0) {
                return res.status(404).json({message: "Expense not found!"})
            } else {
                next()
            }
        })
    }
})


module.exports = app
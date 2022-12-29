const express = require('express')
const app = express()
const db = require('../config/mysql')
const trc = require('../config/transactionsc')
app.use(express.json())

app.use('/', (req, res, next)=>{
    let a = []
        db.query(`SELECT wallet_name from wallets`, function (err, result){
            if (err) throw err
            for (let i = 0; i < result.length; i++) {
                a.push(Object.values(result[i]).toString())
            }
            for(let i = 0; i < a.length; i++) {
                db.query(`UPDATE wallets SET 
                balance = (select COALESCE(SUM(amount),0) from transactions where type = "income" and wallet = "${a[i]}") - (select COALESCE(SUM(amount),0) from transactions where type = "expense" and wallet = "${a[i]}") where wallet_name = "${a[i]}";`, (err, result)=>{
                    if (err) throw err
                })
            }
        })
    next()
})



module.exports = app
const express = require('express')
const app = express()
const db = require('../config/mysql')
app.use(express.json())

app.use('/', (req,res,next)=>{
    if(!req.body.from_wallet || !req.body.to_wallet || !req.body.amount){
        return res.status(400).json({
            message: "Error! Please input from_wallet, to_wallet, and amount!"
        })
    }
    if(parseInt(req.body.amount).toString() == "NaN"){
        return res.status(400).json({
            message: "Error! Please input amount as number!" 
        })
    }
    if(typeof(req.body.from_wallet) != "string" || typeof(req.body.to_wallet) != "string"){
        return res.status(400).json({
            message: "Error! Please input from_wallet and to_wallet as string!"
        })
    }
    db.query(`select * from wallets where wallet_name = "${req.body.from_wallet}";`, function(err, result){
            if (err) throw err
            if (result.length <= 0){
                return res.status(404).json({
                    message: "Error! from_wallet not found!"
                })
            } else {
                db.query(`select * from wallets where wallet_name = "${req.body.to_wallet}";`, function(err, result){
                    if (err) throw err
                    if (result.length <= 0){
                        return res.status(404).json({
                            message: "Error! to_wallet not found!"
                        })
                    } else {
                        db.query(`select balance from wallets where wallet_name = "${req.body.from_wallet}";`, function(err, result){
                            if (err) throw err
                            if (result < req.body.amount){
                                return res.status(404).json({
                                    message: "Error! Balance not enough!"
                                })
                            } else {
                                next()
                            }
                        })
                    }
                })
            }
        })

})

module.exports = app
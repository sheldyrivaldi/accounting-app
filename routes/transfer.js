const express = require('express')
const router = express.Router()
const trx = require('../config/transactionsc')
const db = require('../config/mysql')
router.use(express.json())


router.post('/', (req, res)=>{
        let now = new Date
        let day = now.getDate()
        let month = now.getMonth() + 1
        let year = now.getFullYear()
        db.query(`INSERT INTO transactions (title, type, category_name, amount, wallet, transaction_date) 
            VALUES ("Internal transfer to ${req.body.to_wallet}", "expense", "internal transfer", ${req.body.amount}, "${req.body.from_wallet}", "${year}-${month}-${day}");`, function(err, transactions){
                if (err) throw err
                db.query(`INSERT INTO transactions (title, type, category_name, amount, wallet, transaction_date) 
                VALUES ("Internal transfer from ${req.body.from_wallet}", "income", "internal transfer", ${req.body.amount}, "${req.body.to_wallet}", "${year}-${month}-${day}");`, function(err, transactions){
                if (err) throw err
                res.status(200).json({
                    message: "Internal transfer successfully!"
            })
        })
        })
        
})




module.exports = router
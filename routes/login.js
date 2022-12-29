const express = require('express')
const router = express.Router()
const db = require('../config/mysql')
const jwt = require('jsonwebtoken')
router.use(express.json())
require('dotenv').config()


router.post('/', (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    db.query(`SELECT * FROM user WHERE username = "${username}" and password = "${password}";`, function (err, users) {
        if (err) throw err
        if (!username || !password){
            return res.status(400).json({
                message: "Please input username and password!"
            })
        }
        if (users <= 0) {
            return res.status(404).json({message: "Access denied! User not registered."})
        }
        if (req.body.username == undefined || req.body.password == undefined){
            return res.status(400).json({
                message: "Invalid username or password"
            })
        } else {
            const user = req.body.username
            const jwtKey = process.env.JWT_KEY
            const token = jwt.sign({username:user}, jwtKey)
            return res.status(200).json({
                    Authorization : "Bearer",
                    JWT : token
                })
        }
    })
    
})

module.exports = router
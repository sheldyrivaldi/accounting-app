const express = require('express')
const router = express.Router()
const db = require('../config/mysql')
const jwt = require('jsonwebtoken')
router.use(express.json())
require('dotenv').config()


router.use('/', (req, res, next)=>{
    db.query(`SELECT * FROM users WHERE username = "${req.body.username}" and password = "${req.body.password}";`, function (err, users) {
        if (err) throw err
        if (users.length <= 0) {
            return res.status(404).json({message: "Access denied! User not registered."})
        } 
    })
    next()
})
router.post('/', (req, res)=>{
    if(req.body.username == undefined || req.body.password == undefined){
        res.status(400).json({
            message: "Invalid username or password"
        })
    } else {
        const user = req.body.username
        const jwtKey = process.env.JWT_KEY
        const token = jwt.sign({username:user}, jwtKey)
        res.header('Authorization', "Bearer " + token).status(200).json({
            message: "Login successfully!"
        })
    }
})

module.exports = router
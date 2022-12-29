const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
require('dotenv').config()
app.use(express.json())


app.use('/', (req, res, next)=>{
    const header = req.header('Authorization')
    const jwtKey = process.env.JWT_KEY
    if(!header){
        return res.status(401).json({
            message: "Access denied!"
        })
    }
    try{
        const token = header.split(' ')[1]
        const verification =jwt.verify(token, jwtKey)
        req.user = verification
        next()
    } catch {
        res.status(400).json({
            message: "Invalid token!"
        })
    }
})

module.exports = app
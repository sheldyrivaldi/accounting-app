const express = require('express')
const router = express.Router()
const db = require('../config/mysql')
router.use(express.json())

router.get('/', (req, res)=>{
    res.status(200).json({
        "message": "Hello! Welcome to Personal Accouting App. Please check readme.md file on My github!",
        "alert": "Login first at /login!",
        "github": "https://github.com/sheldyrivaldi",
        "linkedin": "https://linkedin.com/in/sheldyrivaldi"
    })
})

module.exports = router
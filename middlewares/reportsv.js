const express = require('express')
const app = express()
const db = require('../config/mysql')
app.use(express.json())

app.use('/day/:id', (req,res,next)=>{
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
    if(req.params.id != 7 && req.params.id != 30){
        return res.status(400).json({
            message: "Error! Please input id with 7 (7 dyas ago) or 30 (30 days ago)!"
        })
    }    
    next()
})


app.use('/month/:id', (req,res,next)=>{
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
    if(req.params.id < 1 || req.params.id > 12){
        return res.status(400).json({
            message: "Error! Please input month id with 1 - 12!"
        })
    }    
    next()
})

module.exports = app
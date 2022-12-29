const express = require('express')
const app = express()
const db = require('../config/mysql')
app.use(express.json())

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
    db.query(`select * from expense_categories where id = ${req.params.id}`, function(err, result){
            if (err) throw err
            if (result.length <= 0){
                return res.status(404).json({
                    message: "Error! Category not found!"
                })
            } else {
                next()
            }
        })

    
})

app.post('/', (req,res,next)=>{
    if(!req.body.category_name){
        return res.status(400).json({
            message: "Error! Please input category name!"
        })
    }
    if(typeof(req.body.category_name) != "string"){
        return res.status(400).json({
            message: "Error! Please input body as string!"
        })
    }
    db.query(`select * from income_categories where category_name = "${req.body.category_name}"`, function(err, result){
        if (err) throw err
        if (result.length > 0){
            return res.status(400).json({
                message: "Error! Category duplidate!"
            })
        } else {
            next()
        }
    })
})

app.put('/:id', (req,res,next)=>{
    if(!req.body.category_name){
        return res.status(400).json({
            message: "Error! Please input category name!"
        })
    }
    if(typeof(req.body.category_name) != "string"){
        return res.status(400).json({
            message: "Error! Please input body as string!"
        })
    }
    db.query(`select * from expense_categories where category_name = "${req.body.category_name}"`, function(err, result){
        if (err) throw err
        if (result.length > 0){
            return res.status(400).json({
                message: "Error! Category duplidate!"
            })
        } else {
            next()
        }
    })
})

module.exports = app
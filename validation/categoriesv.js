const express = require('express')
const app = express()
const db = require('../config/mysql')
const categoriesc = require('../config/categoriesc')
app.use(express.json())

app.post('/', (req, res, next)=>{
    if(categoriesc.idBody(req) <= 0){
        return res.status(400).json({
            message: "Bad Request! Please input id above 0."
        })
    }
    if(typeof(categoriesc.categoryNameBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad Request! Please input category name as string."
        })
    }
    if(categoriesc.categoryNameBody(req) == undefined){
        return res.status(400).json({
            message: "ERROR!"
        })
    }
    db.query(`SELECT * FROM categories WHERE category_name = "${categoriesc.categoryNameBody(req)}";`, function (err, categories) {
        if (err) throw err
        if (categories.length == 1) {
            return res.status(404).json({message: "Category duplicate!"})
        }
        else {
            next()
        }
    })

})

app.use('/search', (req, res, next)=>{
    if(categoriesc.idQuery(req) <= 0){
        return res.status(400).json({
            message: "Bad Request! Please input id above 0."
        }) 
    }
    if(categoriesc.categoryNameQuery(req).length > 144){
        return res.status(400).json({
            message: "Bad Request! Max 144 characters."
        })

    }
    db.query(`SELECT * FROM categories WHERE category_name = "${categoriesc.categoryNameQuery(req)}";`, function (err, categories) {
        if (err) throw err
        if (categories.length <= 0) {
            return res.status(404).json({message: "No category found!"})
        }
        else {
            next()
        }
    })
})

app.put('/', (req, res, next)=>{
    if(categoriesc.idBody(req) <= 0){
        return res.status(400).json({
            message: "Bad Request! Please input id above 0."
        })
    }
    if(typeof(categoriesc.categoryNameBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad Request! Please input category name as string."
        })
    }
    if(categoriesc.categoryNameBody(req) == undefined){
        return res.status(400).json({
            message: "ERROR!"
        })
    }
    db.query(`SELECT * FROM categories WHERE id = "${categoriesc.idBody(req)}";`, function (err, categories) {
        if (err) throw err
        if (categories.length <= 0) {
            return res.status(404).json({message: "No category found!"})
        }
        else {
            next()
        }
    })
})

module.exports = app
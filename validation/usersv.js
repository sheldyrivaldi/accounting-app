const express = require('express')
const app = express()
const db = require('../config/mysql')
const usersc = require('../config/usersc')
app.use(express.json())

app.use('/search', (req, res, next)=>{
    let regex = new RegExp(/^\d{2}\-\d{2}-\d{4}$/)
    if(usersc.idQuery(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input id above 0"
        })
    }
    if(usersc.usernameQuery(req) > 144){
        return res.status(400).json({
            message: "Bad request! Username max 144 characters."
        })
    }
    if(usersc.emailQuery(req) > 144){
        return res.status(400).json({
            message: "Bad request! Email max 144 characters."
        })
    }
    if(usersc.phoneNumberQuery(req) > 50){
        return res.status(400).json({
            message: "Bad request! Phone number max 50 characters."
        })
    }
    if(regex.test(usersc.registerDateQuery(req)) == false){
        return res.status(400).json({
            message: "Bad request! Please input date according to the format YYYY-MM-DD"
        })
    }
    db.query(`SELECT * FROM users WHERE username = "${usersc.usernameQuery(req)}";`, function (err, users) {
        if (err) throw err
        if (users.length <= 0) {
            return res.status(404).json({message: "User not found!"})
        } else {
            db.query(`SELECT * FROM users WHERE email = "${usersc.emailQuery(req)}";`, function (err, users) {
                if (err) throw err
                if (users.length <= 0) {
                    return res.status(404).json({message: "User not found!"})
                } else {
                    db.query(`SELECT * FROM users WHERE phone_number = "${usersc.phoneNumberQuery(req)}";`, function (err, users) {
                        if (err) throw err
                        if (users.length <= 0) {
                            return res.status(404).json({message: "User not found!"})
                        } else {
                            db.query(`SELECT * FROM users WHERE register_date = "${usersc.register_date(req)}";`, function (err, users) {
                                if (err) throw err
                                if (users.length <= 0) {
                                    return res.status(404).json({message: "User not found!"})
                                } else {
                                    next()
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

app.post('/', (req, res, next)=>{
    if(usersc.usernameBody(req).length > 144 || usersc.usernameBody(req).length < 3){
        return res.status(400).json({
            message: "Bad request! Username min 3 characters and max 144 characters."
        })
    }
    if(typeof(usersc.usernameBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Please input username as string."
        })
    }
    if(usersc.passwordBody(req).length > 12 || usersc.passwordBody(req).length < 6){
        return res.status(400).json({
            message: "Bad request! Password min 6 characters and max 12 characters."
        })
    }
    if(typeof(usersc.passwordBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Please input password as string."
        })
    }
    if(usersc.emailBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Email max 144 characters."
        })
    }
    if(typeof(usersc.emailBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Please input email as string."
        })
    }
    if(usersc.phoneNumberBody(req).length > 50){
        return res.status(400).json({
            message: "Bad request! Phone number max 50 characters."
        })
    }
    if(typeof(usersc.phoneNumberBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Please input phone number as string."
        })
    }

    db.query(`SELECT * FROM users WHERE username = "${usersc.usernameBody(req)}";`, function (err, users) {
        if (err) throw err
        if (users.length == 1) {
            return res.status(404).json({message: "Username duplicate!"})
        }
        else {
            db.query(`SELECT * FROM users WHERE email = "${usersc.emailBody(req)}";`, function (err, users) {
                if (err) throw err
                if (users.length == 1) {
                    return res.status(404).json({message: "Email duplicate!"})
                }
                else {
                    next()
                }
            })
        }
    })
})

app.put('/', (req, res, next)=>{
    if(usersc.idBody(req) <= 0){
        return res.status(400).json({
            message: "Bad request! Please input id above 0."
        })
    }
    if(typeof(usersc.idBody(req)) != "number"){
        return res.status(400).json({
            message: "Bad request! Please input id as number."
        })
    }
    if(usersc.usernameBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Username max 144 characters."
        })
    }
    if(typeof(usersc.usernameBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Please input username as string."
        })
    }
    if(usersc.passwordBody(req).length > 12){
        return res.status(400).json({
            message: "Bad request! Password max 12 characters."
        })
    }
    if(typeof(usersc.passwordBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Please input password as string."
        })
    }
    if(usersc.emailBody(req).length > 144){
        return res.status(400).json({
            message: "Bad request! Email max 144 characters."
        })
    }
    if(typeof(usersc.emailBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Please input email as string."
        })
    }
    if(usersc.phoneNumberBody(req) > 50){
        return res.status(400).json({
            message: "Bad request! Phone number max 50 characters."
        })
    }
    if(typeof(usersc.phoneNumberBody(req)) != "string"){
        return res.status(400).json({
            message: "Bad request! Please input phone number as string."
        })
    }

    db.query(`SELECT * FROM users WHERE username = "${usersc.usernameBody(req)}";`, function (err, users) {
        if (err) throw err
        if (users.length == 1) {
            return res.status(404).json({message: "Username duplicate!"})
        }
        else {
            db.query(`SELECT * FROM users WHERE email = "${usersc.emailBody(req)}";`, function (err, users) {
                if (err) throw err
                if (users.length == 1) {
                    return res.status(404).json({message: "Email duplicate!"})
                }
                else {
                    next()
                }
            })
        }
    })
})



module.exports = app


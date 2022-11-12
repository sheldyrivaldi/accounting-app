const express = require('express')
const router = express.Router()
const db = require('../config/mysql')
const usersc = require('../config/usersc')
const validation = require('../validation/usersv')
router.use(express.json())
router.use(validation)

router.get('/', (req, res)=>{
    usersc.getAllUsers(db,res)
})

router.get('/search', (req, res)=>{
    if(usersc.idQuery(req) != undefined){
        return usersc.getUser(db, res, "id", usersc.idQuery(req))
    }
    if(usersc.usernameQuery(req) != undefined){
        return usersc.getUser(db, res, "username", usersc.usernameQuery(req))
    }
    if(usersc.emailQuery(req) != undefined){
        return usersc.getUser(db, res, "email", usersc.emailQuery(req))
    }
    if(usersc.phoneNumberQuery(req) != undefined){
        return usersc.getUser(db, res, "phone_number", usersc.phoneNumberQuery(req))
    }
    if(usersc.registerDateQuery(req) != undefined){
        return usersc.getUser(db, res, "register_date", usersc.registerDateQuery(req))
    }
})


router.post('/', (req,res)=>{
    usersc.createUser(db, req, res)
})

router.put('/', (req, res)=>{
    usersc.updateUser(db, req, res)
})

router.delete('/search', (req, res)=>{
    usersc.deleteUser(db, req, res)
})




module.exports = router
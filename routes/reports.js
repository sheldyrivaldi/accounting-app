const express = require('express')
const router = express.Router()
const rpt = require('../config/reportsc')
const db = require('../config/mysql')
router.use(express.json())

router.get('/', (req, res)=>{
    rpt.getReportIncomeExpense(db, req, res)
})
router.get('/day', (req, res)=>{
    res.status(400).json({
        message: "Error! Please input day id!",
        example: `"/reports/day/7" or "/reports/day/30"`
    })
})
router.get('/day/7', (req,res)=>{
    rpt.filterDateRange(db, req, res, "7")
})
router.get('/day/30', (req,res)=>{
    rpt.filterDateRange(db, req, res, "30")
})
router.get('/month', (req, res)=>{
    res.status(400).json({
        message: "Error! Please input month id between 1 and 12!",
        example: `/reports/month/12`
    })
})
router.get('/month/:id', (req, res)=>{
    rpt.filterMonth(db, req, res)
})



module.exports = router
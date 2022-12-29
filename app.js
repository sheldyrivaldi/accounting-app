const express = require('express')
const app = express()

// Routes
const homepage = require('./routes/homepage')
const login = require('./routes/login')
const wallets = require('./routes/wallets')
const income_categories = require('./routes/income_categories')
const expense_categories = require('./routes/expense_categories')
const transactions = require('./routes/transactions')
const transfer = require('./routes/transfer')
const reports = require('./routes/reports')

// Middlewares
const jwtAuth = require('./auth/JwtAuth')
const updateSaldo = require('./middlewares/updateSaldo')
const walletsValidation = require('./middlewares/walletsv')
const incomeCategoriesValidation = require('./middlewares/income_categoriesv')
const expenseCategoriesValidation = require('./middlewares/expense_categoriesv')
const transactionsValidation = require('./middlewares/transactionsv')
const transferValidation = require('./middlewares/transferv')
const reportValidation = require('./middlewares/reportsv')


//Application
app.use(express.json())
app.use('/', homepage)
app.use('/login', login)
app.use('/wallets', jwtAuth, updateSaldo, walletsValidation, wallets, updateSaldo)
app.use('/income_categories', jwtAuth, incomeCategoriesValidation, income_categories,)
app.use('/expense_categories', jwtAuth, expenseCategoriesValidation, expense_categories)
app.use('/transactions', jwtAuth, transactionsValidation, updateSaldo, transactions, updateSaldo)
app.use('/transfer', jwtAuth, transferValidation, updateSaldo, transfer, updateSaldo)
app.use('/reports', jwtAuth, reportValidation, reports)



module.exports = app
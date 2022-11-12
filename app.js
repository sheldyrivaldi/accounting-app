const express = require('express')
const app = express()
const products = require('./routes/products')
const users = require('./routes/users')
const transactions = require('./routes/transactions')
const categories = require('./routes/categories')
const expenses = require('./routes/expenses')
const statistic = require('./routes/statistic')
const login = require('./routes/login')
const auth = require('./auth/JwtAuth')

app.use(express.json())

app.use('/products', auth, products)
app.use('/users', auth, users)
app.use('/transactions', auth, transactions)
app.use('/categories', auth, categories)
app.use('/expenses', auth, expenses)
app.use('/statistic', auth, statistic)
app.use('/login', login)


module.exports = app
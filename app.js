const express = require('express')
const app = express()
const products = require('./routes/products')
const users = require('./routes/users')
const transactions = require('./routes/transactions')
const categories = require('./routes/categories')
const expenses = require('./routes/expenses')
const statistic = require('./routes/statistic')
app.use(express.json())

app.use('/products', products)
app.use('/users', users)
app.use('/transactions', transactions)
app.use('/categories', categories)
app.use('/expenses', expenses)
app.use('/statistic', statistic)


module.exports = app
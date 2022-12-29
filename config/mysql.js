const mysql = require('mysql2')
require('dotenv').config()
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')


module.exports = connection
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')

require('../database')

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use('/api/rest', routes)

module.exports = app

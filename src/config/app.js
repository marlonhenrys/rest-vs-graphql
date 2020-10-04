require('dotenv').config()
require('../database')

const express = require('express')
const morgan = require('morgan')

const routes = require('./routes')
const graphql = require('./graphql')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/rest', routes)
app.use('/api/graphql', graphql)

module.exports = app

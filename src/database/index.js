const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const { Entity } = require('../app/models')

const connection = new Sequelize(dbConfig)

Entity.init(connection)

module.exports = connection

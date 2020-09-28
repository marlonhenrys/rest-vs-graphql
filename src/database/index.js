const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const { Address, Family, Finance, Parentage, Person, Vehicle } = require('../app/models')

const connection = new Sequelize(dbConfig)

Address.init(connection)
Family.init(connection)
Finance.init(connection)
Parentage.init(connection)
Person.init(connection)
Vehicle.init(connection)

Address.associate(connection.models)
Family.associate(connection.models)
Finance.associate(connection.models)
Parentage.associate(connection.models)
Person.associate(connection.models)
Vehicle.associate(connection.models)

module.exports = connection

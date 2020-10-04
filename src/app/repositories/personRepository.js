const { Person } = require('../models')

module.exports = {
  findOne: id => Person.findByPk(id),
  findAll: limit => Person.findAndCountAll({ limit })
}

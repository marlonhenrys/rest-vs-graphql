const { Address } = require('../models')

module.exports = {
  findOne: id => Address.findByPk(id),
  findAll: limit => Address.findAndCountAll({ limit })
}

const { Entity } = require('../models')

module.exports = {

  create: entity => Entity.create(entity),

  findById: id => Entity.findByPk(id),

  findAll: () => Entity.findAll()

}

const { Person } = require('../models')

module.exports = {
  findOne: id => Person.findByPk(id),
  findAll: limit => Person.findAndCountAll({ limit }),

  superOne: id => Person.findByPk(id, {
    include: [
      { association: 'vehicles' },
      { association: 'finances' },
      { association: 'address' },
      { association: 'familyHead1' },
      { association: 'familyHead2' },
      { association: 'parentagesAs1' },
      { association: 'parentagesAs2' }
    ]
  }),

  superAll: limit => Person.findAndCountAll({
    limit,
    include: [
      { association: 'vehicles' },
      { association: 'finances' },
      { association: 'address' },
      { association: 'familyHead1' },
      { association: 'familyHead2' },
      { association: 'parentagesAs1' },
      { association: 'parentagesAs2' }
    ]
  })
}

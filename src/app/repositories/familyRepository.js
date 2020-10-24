const { Family } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  findOne: id => Family.findByPk(id),
  findAll: limit => Family.findAndCountAll({ limit }),

  findOneByPerson: personId => Family.findOne({
    where: {
      [Op.or]: {
        person1_id: personId,
        person2_id: personId
      }
    }
  }),

  findOneByPersonComplete: personId => Family.findOne({
    where: {
      [Op.or]: {
        person1_id: personId,
        person2_id: personId
      }
    },
    include: [
      { association: 'head1' },
      { association: 'head2' },
      {
        association: 'parentages',
        include: [
          { association: 'person1' },
          { association: 'person2' },
          { association: 'family' }
        ]
      }
    ]
  })
}

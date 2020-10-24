const { Finance } = require('../models')

module.exports = {
  findOneByPerson: (personId, id) => Finance.findOne({
    where: {
      id,
      person_id: personId
    }
  }),

  findAllByPerson: (personId, limit) => Finance.findAndCountAll({
    limit,
    where: {
      person_id: personId
    }
  })
}

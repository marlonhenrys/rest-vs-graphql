const { Vehicle } = require('../models')

module.exports = {
  findOneByPerson: (personId, id) => Vehicle.findOne({
    where: {
      id,
      person_id: personId
    }
  }),

  findAllByPerson: (personId, limit) => Vehicle.findAndCountAll({
    limit,
    where: {
      person_id: personId
    }
  })
}

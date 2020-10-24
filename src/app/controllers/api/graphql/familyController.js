const { familyRepository } = require('../../../repositories')
const { Family } = require('../../../resolvers')

module.exports = {
  family: async ({ id }) => {
    const family = await familyRepository.findOne(id)
    return new Family(family.get({ plain: true }))
  },

  families: async ({ limit }) => {
    const list = await familyRepository.findAll(limit)
    list.rows = list.rows.map(family => new Family(family.get({ plain: true })))
    return list
  }
}

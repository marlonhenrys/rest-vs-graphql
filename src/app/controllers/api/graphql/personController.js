const { personRepository } = require('../../../repositories')
const { Person } = require('../../../resolvers')

module.exports = {
  person: async ({ id }) => {
    const person = await personRepository.findOne(id)
    return new Person(person.get({ plain: true }))
  },

  people: async ({ limit }) => {
    const list = await personRepository.findAll(limit)
    list.rows = list.rows.map(person => new Person(person.get({ plain: true })))
    return list
  }
}

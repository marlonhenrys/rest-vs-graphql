const { personRepository } = require('../../../repositories')

module.exports = {
  person: ({ id }) => personRepository.findOne(id),
  people: ({ limit }) => personRepository.findAll(limit)
}

const { personRepository } = require('../../../repositories')

module.exports = {

  index: async (req, res) => {
    const { limit } = req.query
    const result = await personRepository.findAll(limit)
    return res.status(200).json(result)
  },

  show: async (req, res) => {
    const { id } = req.params
    const result = await personRepository.findOne(id)
    return res.status(200).json(result)
  }
}

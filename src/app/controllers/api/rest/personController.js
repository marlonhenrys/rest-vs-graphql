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
    return result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Nenhum registro encontrado' })
  },

  indexWithAll: async (req, res) => {
    const { limit } = req.query
    const result = await personRepository.superAll(limit)
    return res.status(200).json(result)
  },

  showWithAll: async (req, res) => {
    const { id } = req.params
    const result = await personRepository.superOne(id)
    return result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Nenhum registro encontrado' })
  }
}

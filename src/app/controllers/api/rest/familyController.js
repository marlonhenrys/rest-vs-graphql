const { familyRepository } = require('../../../repositories')

module.exports = {
  index: async (req, res) => {
    const { limit } = req.query
    const result = await familyRepository.findAll(limit)
    return res.status(200).json(result)
  },

  show: async (req, res) => {
    const { id } = req.params
    const result = await familyRepository.findOne(id)
    return result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Nenhum registro encontrado' })
  },

  headFamily: async (req, res) => {
    const { personId } = req.params
    const result = await familyRepository.findOneByPerson(personId)
    return result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Nenhum registro encontrado' })
  }
}

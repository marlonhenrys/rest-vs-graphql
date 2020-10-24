const { addressRepository } = require('../../../repositories')

module.exports = {
  index: async (req, res) => {
    const { limit } = req.query
    const result = await addressRepository.findAll(limit)
    return res.status(200).json(result)
  },

  show: async (req, res) => {
    const { id } = req.params
    const result = await addressRepository.findOne(id)
    return result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Nenhum registro encontrado' })
  }
}

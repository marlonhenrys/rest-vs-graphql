const { parentageRepository } = require('../../../repositories')

module.exports = {
  index: async (req, res) => {
    const { limit, role } = req.query
    const { personId } = req.params
    const result = await parentageRepository.findAllByPerson(personId, limit, role)
    return res.status(200).json(result)
  },

  show: async (req, res) => {
    const { personId, id } = req.params
    const result = await parentageRepository.findOneByPerson(personId, id)
    return result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Nenhum registro encontrado' })
  },

  indexByFamily: async (req, res) => {
    const { limit, role } = req.query
    const { familyId } = req.params
    const result = await parentageRepository.findAllByFamily(familyId, limit, role)
    return res.status(200).json(result)
  },

  showByFamily: async (req, res) => {
    const { familyId, id } = req.params
    const result = await parentageRepository.findOneByFamily(familyId, id)
    return result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Nenhum registro encontrado' })
  }
}

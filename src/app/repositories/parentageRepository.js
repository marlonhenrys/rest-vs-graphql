const { Parentage } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  findOneByPerson: (personId, id) => Parentage.findOne({
    where: {
      id,
      [Op.or]: {
        person1_id: personId,
        person2_id: personId
      }
    }
  }),

  findAllByPerson: (personId, limit) => Parentage.findAndCountAll({
    limit,
    where: {
      [Op.or]: {
        person1_id: personId,
        person2_id: personId
      }
    }
  }),

  findOneByPersonComplete: (personId, id) => Parentage.findOne({
    where: {
      id,
      [Op.or]: {
        person1_id: personId,
        person2_id: personId
      }
    },
    include: [
      { association: 'person1' },
      { association: 'person2' },
      { association: 'family' }
    ]
  }),

  findAllByPersonComplete: (personId, limit) => Parentage.findAndCountAll({
    limit,
    where: {
      [Op.or]: {
        person1_id: personId,
        person2_id: personId
      }
    },
    include: [
      { association: 'person1' },
      { association: 'person2' },
      { association: 'family' }
    ]
  }),

  findOneByFamily: (familyId, id) => Parentage.findOne({
    where: {
      id,
      family_id: familyId
    }
  }),

  findAllByFamily: (familyId, limit) => Parentage.findAndCountAll({
    limit,
    where: {
      family_id: familyId
    }
  }),

  findOneByFamilyComplete: (familyId, id) => Parentage.findOne({
    where: {
      id,
      family_id: familyId
    },
    include: [
      { association: 'person1' },
      { association: 'person2' },
      { association: 'family' }
    ]
  }),

  findAllByFamilyComplete: (familyId, limit) => Parentage.findAll({
    limit,
    where: {
      family_id: familyId
    },
    include: [
      { association: 'person1' },
      { association: 'person2' },
      { association: 'family' }
    ]
  })
}

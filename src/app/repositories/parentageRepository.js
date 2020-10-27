const { Parentage } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  findOneByPerson: (personId, id) => Parentage.findOne({
    where: {
      [Op.and]: {
        id,
        [Op.or]: {
          person1_id: personId,
          person2_id: personId
        }
      }
    }
  }),

  findAllByPerson: (personId, limit, role = '') => Parentage.findAndCountAll({
    limit,
    where: {
      [Op.and]: [
        {
          [Op.or]: {
            person1_id: personId,
            person2_id: personId
          }
        },
        {
          [Op.or]: {
            role1: { [Op.like]: '%' + role + '%' },
            role2: { [Op.like]: '%' + role + '%' }
          }
        }
      ]
    }
  }),

  findOneByPersonComplete: (personId, id) => Parentage.findOne({
    where: {
      [Op.and]: {
        id,
        [Op.or]: {
          person1_id: personId,
          person2_id: personId
        }
      }
    },
    include: [
      { association: 'person1' },
      { association: 'person2' },
      { association: 'family' }
    ]
  }),

  findAllByPersonComplete: (personId, limit, role = '') => Parentage.findAndCountAll({
    limit,
    where: {
      [Op.and]: [
        {
          [Op.or]: {
            person1_id: personId,
            person2_id: personId
          }
        },
        {
          [Op.or]: {
            role1: { [Op.like]: '%' + role + '%' },
            role2: { [Op.like]: '%' + role + '%' }
          }
        }
      ]
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

  findAllByFamily: (familyId, limit, role = '') => Parentage.findAndCountAll({
    limit,
    where: {
      [Op.and]: [
        {
          family_id: familyId
        },
        {
          [Op.or]: {
            role1: { [Op.like]: '%' + role + '%' },
            role2: { [Op.like]: '%' + role + '%' }
          }
        }
      ]
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

  findAllByFamilyComplete: (familyId, limit, role = '') => Parentage.findAll({
    limit,
    where: {
      [Op.and]: [
        {
          family_id: familyId
        },
        {
          [Op.or]: {
            role1: { [Op.like]: '%' + role + '%' },
            role2: { [Op.like]: '%' + role + '%' }
          }
        }
      ]
    },
    include: [
      { association: 'person1' },
      { association: 'person2' },
      { association: 'family' }
    ]
  })
}

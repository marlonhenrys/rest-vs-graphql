'use strict'

const faker = require('faker/locale/pt_BR')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const entities = []

    for (let index = 0; index < 5; index++) {
      const entity = {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        created_at: new Date(),
        updated_at: new Date()
      }
      entities.push(entity)
    }

    return queryInterface.bulkInsert('entities', entities, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('entities', null, {})
  }
}

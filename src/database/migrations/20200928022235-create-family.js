'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('families', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      person1_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'people', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      person2_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'people', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('families')
  }
}

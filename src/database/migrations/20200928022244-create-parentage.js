'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parentages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      person1_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      role1: {
        type: Sequelize.ENUM([
          'Avô/Avó',
          'Pai/Mãe',
          'Tio/Tia',
          'Irmão/Irmã',
          'Companheiro(a)'
        ]),
        allowNull: false
      },
      role2: {
        type: Sequelize.ENUM([
          'Neto(a)',
          'Filho(a)',
          'Sobrinho(a)',
          'Irmão/Irmã',
          'Companheiro(a)'
        ]),
        allowNull: false
      },
      family_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'families', key: 'id' },
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
    return queryInterface.dropTable('parentages')
  }
}

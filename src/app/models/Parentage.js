const { Model, DataTypes } = require('sequelize')

class Parentage extends Model {
  static init (sequelize) {
    super.init({
      role1: {
        type: DataTypes.ENUM([
          'Avô/Avó',
          'Pai/Mãe',
          'Tio/Tia',
          'Irmão/Irmã',
          'Companheiro(a)'
        ]),
        allowNull: false
      },
      role2: {
        type: DataTypes.ENUM([
          'Neto(a)',
          'Filho(a)',
          'Sobrinho(a)',
          'Irmão/Irmã',
          'Companheiro(a)'
        ]),
        allowNull: false
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Person, { foreignKey: 'person1_id', as: 'person1' })
    this.belongsTo(models.Person, { foreignKey: 'person2_id', as: 'person2' })
    this.belongsTo(models.Family, { foreignKey: 'family_id', as: 'family' })
  }
}

module.exports = Parentage

const { Model, DataTypes } = require('sequelize')

class Vehicle extends Model {
  static init (sequelize) {
    super.init({
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fuel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'owner' })
  }
}

module.exports = Vehicle

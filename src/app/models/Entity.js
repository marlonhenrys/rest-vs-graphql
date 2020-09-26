const { Model, DataTypes } = require('sequelize')

class Entity extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize
    })
  }
}

module.exports = Entity

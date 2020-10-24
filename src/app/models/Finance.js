const { Model, DataTypes } = require('sequelize')

class Finance extends Model {
  static init (sequelize) {
    super.init({
      currencyCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currencyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currencySymbol: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'holder' })
  }
}

module.exports = Finance

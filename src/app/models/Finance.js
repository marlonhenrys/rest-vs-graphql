const { Model, DataTypes } = require('sequelize')

class Finance extends Model {
  static init (sequelize) {
    super.init({
      currency_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      account_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currency_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currency_symbol: {
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

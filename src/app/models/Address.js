const { Model, DataTypes } = require('sequelize')

class Address extends Model {
  static init (sequelize) {
    super.init({
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      streetName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      timeZone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.hasMany(models.Person, { foreignKey: 'address_id', as: 'residents' })
  }
}

module.exports = Address

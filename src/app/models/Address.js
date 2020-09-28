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
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      street_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      time_zone: {
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

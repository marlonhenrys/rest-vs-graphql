const { Model, DataTypes } = require('sequelize')

class Person extends Model {
  static init (sequelize) {
    super.init({
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genre: {
        type: DataTypes.ENUM(['Masculino', 'Feminino', 'Outro']),
        allowNull: false
      },
      birth: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      jobArea: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.hasOne(models.Family, { foreignKey: 'person1_id', as: 'family1' })
    this.hasOne(models.Family, { foreignKey: 'person2_id', as: 'family2' })
    this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' })
    this.hasMany(models.Vehicle, { foreignKey: 'person_id', as: 'vehicles' })
    this.hasMany(models.Finance, { foreignKey: 'person_id', as: 'finances' })
    this.belongsToMany(models.Person, { foreignKey: 'person1_id', through: models.Parentage, as: 'parentages2' })
    this.belongsToMany(models.Person, { foreignKey: 'person2_id', through: models.Parentage, as: 'parentages1' })
  }
}

module.exports = Person

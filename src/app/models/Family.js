const { Model, DataTypes } = require('sequelize')

class Family extends Model {
  static init (sequelize) {
    super.init({
      country: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Person, { foreignKey: 'person1_id', as: 'head1' })
    this.belongsTo(models.Person, { foreignKey: 'person2_id', as: 'head2' })
    this.hasMany(models.Parentage, { foreignKey: 'family_id', as: 'parentages' })
  }
}

module.exports = Family

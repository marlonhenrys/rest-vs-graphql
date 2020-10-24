module.exports = {
  def: `
  type Finance {
    id: ID
    currencyCode: String
    currencyName: String
    currencySymbol: String
    createdAt: String
    updatedAt: String
  }
  type Finances {
    count: Int
    rows: [Finance]
  }`
}

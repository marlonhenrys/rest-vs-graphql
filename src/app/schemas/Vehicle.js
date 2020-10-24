module.exports = {
  def: `
  type Vehicle {
    id: ID
    model: String
    type: String
    fuel: String
    color: String
    manufacturer: String
    createdAt: String
    updatedAt: String
  }
  type Vehicles {
    count: Int
    rows: [Vehicle]
  }`
}

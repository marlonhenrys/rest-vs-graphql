module.exports = {
  def: `
  type Address {
    id: ID
    country: String
    state: String
    city: String
    zipCode: String
    streetName: String
    timeZone: String
    latitude: String
    longitude: String
    createdAt: String
    updatedAt: String
  }
  type Addresses {
    count: Int
    rows: [Address]
  }`
}

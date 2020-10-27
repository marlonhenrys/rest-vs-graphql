module.exports = {
  def: `
  type Person {
    id: ID
    firstName: String
    lastName: String
    genre: String
    birth: String
    cpf: String
    email: String
    phone: String
    jobArea: String
    headFamily: Family
    address: Address
    vehicles(limit: Int): Vehicles
    vehicle(id: ID!): Vehicle
    finances(limit: Int): Finances
    finance(id: ID!): Finance
    parentages(limit: Int, role: String): Parentages
    parentage(id: ID!): Parentage
    createdAt: String
    updatedAt: String
  }
  type People {
    count: Int
    rows: [Person]
  }`,
  queries: `  
    person(id: ID!): Person
    people(limit: Int): People
  `
}

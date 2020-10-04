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

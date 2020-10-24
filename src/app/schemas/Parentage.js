module.exports = {
  def: `
  type Parentage {
    id: ID
    person1: Person
    role1: String
    person2: Person
    role2: String
    family: Family
    createdAt: String
    updatedAt: String
  }
  type Parentages {
    count: Int
    rows: [Parentage]
  }`
}

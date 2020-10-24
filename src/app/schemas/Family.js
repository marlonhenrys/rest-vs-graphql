module.exports = {
  def: `
  type Family {
    id: ID
    country: String
    head1: Person
    head2: Person
    parentages: [Parentage]
    createdAt: String
    updatedAt: String
  }
  type Families {
    count: Int
    rows: [Family]
  }`,
  queries: `  
    family(id: ID!): Family
    families(limit: Int): Families
  `
}

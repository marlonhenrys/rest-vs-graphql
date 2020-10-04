const { graphqlHTTP } = require('express-graphql')
const schemas = require('../app/schemas')
const resolvers = require('../app/controllers/api/graphql')

module.exports = graphqlHTTP({
  schema: schemas,
  rootValue: resolvers,
  graphiql: true
})

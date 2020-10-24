const { buildSchema } = require('graphql')

const schemas = []

schemas.push(require('./Person'))
schemas.push(require('./Parentage'))
schemas.push(require('./Family'))
schemas.push(require('./Address'))
schemas.push(require('./Vehicle'))
schemas.push(require('./Finance'))

module.exports = buildSchema(`
  ${schemas.map(schema => schema.def)}
  type Query {
  ${schemas.map(schema => schema.queries)}
  }
`)

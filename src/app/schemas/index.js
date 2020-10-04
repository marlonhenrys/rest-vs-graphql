const { buildSchema } = require('graphql')

const schemas = []

schemas.push(require('./Person'))

module.exports = buildSchema(`
  ${schemas.map(schema => schema.def)}
  type Query {
  ${schemas.map(schema => schema.queries)}
  }
`)

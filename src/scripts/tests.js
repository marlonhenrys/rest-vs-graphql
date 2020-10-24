const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)

const axios = require('axios')
const populate = require('./populate')
const runExportation = require('../app/helpers/exportCsv')

const api = axios.create({
  baseURL: 'http://localhost:3333/api'
})

api.interceptors.request.use((config) => {
  config.headers['request-startTime'] = process.hrtime()
  return config
})

api.interceptors.response.use((response) => {
  const start = response.config.headers['request-startTime']
  const end = process.hrtime(start)
  const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
  response.headers['request-duration'] = milliseconds
  return response
})

const generations = [10, 20, 30, 40, 50, 60, 100]

const runTests = async () => {
  for (let i = 0; i < 10; i++) {
    console.log('iteration', i, new Date())
    for (const generation of generations) {
      await exec('yarn populate')
      await populate(generation)
      const resRest = await api.get('/rest/people')
      runExportation([{
        api: 'rest',
        quantity: generation * 10,
        dataLength: resRest.headers['content-length'],
        responseTime: resRest.headers['request-duration']
      }])
      const resGraphql = await api.post('/graphql', {
        query: `
                    query {
                        people {
                            rows {
                                id
                                firstName
                                lastName
                                genre
                                birth
                                cpf
                                email
                                phone
                                jobArea
                            }
                        }
                    }
                `
      })
      runExportation([{
        api: 'graphql',
        quantity: generation * 10,
        dataLength: resGraphql.headers['content-length'],
        responseTime: resGraphql.headers['request-duration']
      }])
      await exec('yarn truncate')
    }
  }
}

runTests()

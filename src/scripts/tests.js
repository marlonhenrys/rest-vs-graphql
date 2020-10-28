const axios = require('axios')
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

const quantities = [10, 50, 100, 500, 1000]

const runTests = async () => {
  // Buscar todos os dados disponíveis das pessoas de uma lista
  for (let i = 0; i < 10; i++) {
    for (const quantity of quantities) {
      const resRest = await api.get('/rest/all', {
        params: {
          limit: quantity
        }
      })
      runExportation('test1', [{
        'user story': 1,
        api: 'rest',
        quantity: quantity,
        dataLength: resRest.headers['content-length'],
        responseTime: resRest.headers['request-duration']
      }])
      const resGraphql = await api.post('/graphql', {
        query: `
            query{
              people(limit: ${quantity}){
                count
                rows{
                  parentages{
                    rows{
                      id
                      person1{ firstName }
                      role1
                      role2
                      person2{ firstName }
                      family{  country head1{ firstName } head2 { firstName } }
                    }
                  } 
                }
              }
            }
          `
      })
      runExportation('test1', [{
        'user story': 1,
        api: 'graphql',
        quantity: quantity,
        dataLength: resGraphql.headers['content-length'],
        responseTime: resGraphql.headers['request-duration']
      }])
    }
  }

  // Consultar a família dos parentescos relacionados com Avô/Avó de uma pessoa
  for (let i = 0; i < 10; i++) {
    let restLenght = 0
    let restTime = 0
    const firstRest = await api.get('/rest/people/50/parentages', {
      params: {
        role: 'Avô/Avó'
      }
    })
    restLenght += Number(firstRest.headers['content-length'])
    restTime += Number(firstRest.headers['request-duration'])
    for (const person of firstRest.data.rows) {
      const secondRest = await api.get(`/rest/families/${person.family_id}`)
      restLenght += Number(secondRest.headers['content-length'])
      restTime += Number(secondRest.headers['request-duration'])
    }

    runExportation('test1', [{
      'user story': 2,
      api: 'rest',
      quantity: undefined,
      dataLength: restLenght,
      responseTime: restTime
    }])

    const resGraphql = await api.post('/graphql', {
      query: `
        query{
          person(id: 60){
            parentages(role: "Avô/Avó"){
              rows{
                family{
                  id
                  country
                  head1{
                    id
                  }
                  head2{
                    id
                  }
                }
              }
            }
          }
        }
      `
    })
    runExportation('test1', [{
      'user story': 2,
      api: 'graphql',
      quantity: undefined,
      dataLength: resGraphql.headers['content-length'],
      responseTime: resGraphql.headers['request-duration']
    }])
  }

  // Consultar dados do head1 da família dos parentescos relacionados com Avô/Avó de uma pessoa
  for (let i = 0; i < 10; i++) {
    let restLenght = 0
    let restTime = 0
    const firstRest = await api.get('/rest/people/50/parentages', {
      params: {
        role: 'Avô/Avó'
      }
    })
    restLenght += Number(firstRest.headers['content-length'])
    restTime += Number(firstRest.headers['request-duration'])
    for (const person of firstRest.data.rows) {
      const secondRest = await api.get(`/rest/families/${person.family_id}`)
      restLenght += Number(secondRest.headers['content-length'])
      restTime += Number(secondRest.headers['request-duration'])
      const thirdRest = await api.get(`/rest/people/${secondRest.data.person1_id}`)
      restLenght += Number(thirdRest.headers['content-length'])
      restTime += Number(thirdRest.headers['request-duration'])
    }

    runExportation('test1', [{
      'user story': 3,
      api: 'rest',
      quantity: undefined,
      dataLength: restLenght,
      responseTime: restTime
    }])

    const resGraphql = await api.post('/graphql', {
      query: `
        query{
          person(id: 60){
            parentages(role: "Avô/Avó"){
              rows{
                family{
                  head1{
                    id
                    firstName
                    lastName
                    genre
                    birth
                    cpf
                    email
                    jobArea
                  }
                }
              }
            }
          }
        }
       `
    })
    runExportation('test1', [{
      'user story': 3,
      api: 'graphql',
      quantity: undefined,
      dataLength: resGraphql.headers['content-length'],
      responseTime: resGraphql.headers['request-duration']
    }])
  }

  // Consulta simples de uma pessoa em específico
  for (let i = 0; i < 10; i++) {
    const resRest = await api.get('/rest/people/60')

    runExportation('test1', [{
      'user story': 4,
      api: 'rest',
      quantity: undefined,
      dataLength: resRest.headers['content-length'],
      responseTime: resRest.headers['request-duration']
    }])

    const resGraphql = await api.post('/graphql', {
      query: `
        query{
          person(id: 60){
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
      `
    })

    runExportation('test1', [{
      'user story': 4,
      api: 'graphql',
      quantity: undefined,
      dataLength: resGraphql.headers['content-length'],
      responseTime: resGraphql.headers['request-duration']
    }])
  }

  // consulta de todos os bens de uma pessoa (veículo, endereço e finanças)
  for (let i = 0; i < 10; i++) {
    let restLenght = 0
    let restTime = 0

    const firstRest = await api.get('/rest/people/60')

    restLenght += Number(firstRest.headers['content-length'])
    restTime += Number(firstRest.headers['request-duration'])

    const secondRest = await api.get(`/rest/addresses/${firstRest.data.address_id}`)

    restLenght += Number(secondRest.headers['content-length'])
    restTime += Number(secondRest.headers['request-duration'])

    const thirdRest = await api.get('rest/people/60/vehicles')

    restLenght += Number(thirdRest.headers['content-length'])
    restTime += Number(thirdRest.headers['request-duration'])

    const fourthRest = await api.get('rest/people/60/finances')

    restLenght += Number(fourthRest.headers['content-length'])
    restTime += Number(fourthRest.headers['request-duration'])

    runExportation('test1', [{
      'user story': 5,
      api: 'rest',
      quantity: undefined,
      dataLength: restLenght,
      responseTime: restTime
    }])

    const resGraphql = await api.post('/graphql', {
      query: `
        query{
          person(id: 60){
            address {
              id
              country
              state
              city
              zipCode
              streetName
              timeZone
              latitude
              longitude
            }
            vehicles {
              rows {
                id
                model
                type
                fuel
                color
                manufacturer
              }
            }
            finances {
              rows {
                id
                currencyCode
                currencyName
                currencySymbol
              }
            }
          }
        }
      `
    })

    runExportation('test1', [{
      'user story': 5,
      api: 'graphql',
      quantity: undefined,
      dataLength: resGraphql.headers['content-length'],
      responseTime: resGraphql.headers['request-duration']
    }])
  }
}

runTests()

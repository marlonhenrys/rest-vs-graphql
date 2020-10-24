const personRepository = require('./personRepository')
const vehicleRepository = require('./vehicleRepository')
const parentageRepository = require('./parentageRepository')
const financeRepository = require('./financeRepository')
const familyRepository = require('./familyRepository')
const addressRepository = require('./addressRepository')

module.exports = {
  addressRepository,
  familyRepository,
  financeRepository,
  parentageRepository,
  vehicleRepository,
  personRepository
}

const {
  vehicleRepository, familyRepository, addressRepository, financeRepository, parentageRepository
} = require('../repositories')

class Person {
  constructor (person) {
    Object.assign(this, person)
  }

  headFamily () {
    return familyRepository.findOneByPersonComplete(this.id)
  }

  address () {
    return addressRepository.findOne(this.address_id)
  }

  vehicles ({ limit }) {
    return vehicleRepository.findAllByPerson(this.id, limit)
  }

  vehicle ({ id }) {
    return vehicleRepository.findOneByPerson(this.id, id)
  }

  finances ({ limit }) {
    return financeRepository.findAllByPerson(this.id, limit)
  }

  finance ({ id }) {
    return financeRepository.findOneByPerson(this.id, id)
  }

  parentages ({ limit, role }) {
    return parentageRepository.findAllByPersonComplete(this.id, limit, role)
  }

  parentage ({ id }) {
    return parentageRepository.findOneByPersonComplete(this.id, id)
  }
}

module.exports = Person

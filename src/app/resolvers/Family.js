const { personRepository, parentageRepository } = require('../repositories')

class Family {
  constructor (family) {
    Object.assign(this, family)
  }

  head1 () {
    return personRepository.findOne(this.person1_id)
  }

  head2 () {
    return personRepository.findOne(this.person2_id)
  }

  parentages ({ limit, role }) {
    return parentageRepository.findAllByFamilyComplete(this.id, limit, role)
  }

  parentage ({ id }) {
    return parentageRepository.findOneByFamilyComplete(this.id, id)
  }
}

module.exports = Family

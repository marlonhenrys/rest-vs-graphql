const { personRepository, familyRepository } = require('../repositories')
const Person = require('./Person')
const Family = require('./Family')

class Parentage {
  constructor (parentage) {
    console.log(parentage)
    Object.assign(this, parentage)
  }

  async person1 () {
    const person = await personRepository.findOne(this.person1_id)
    const obj = new Person(person.get())
    return obj
  }

  async person2 () {
    const person = await personRepository.findOne(this.person2_id)
    return new Person(person.get({ plain: true }))
  }

  async family () {
    const family = await familyRepository.findOne(this.family_id)
    return new Family(family.get({ plain: true }))
  }
}

module.exports = Parentage

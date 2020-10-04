require('../database')

const moment = require('moment')
const faker = require('faker/locale/pt_BR')
const runGenerator = require('../app/helpers/dataGenerator')
const { Person, Family, Parentage } = require('../app/models')

const genres = ['Masculino', 'Feminino', 'Outro']

async function createPeople (people) {
  people.forEach(async person => {
    await Person.create({
      firstName: person.firstName,
      lastName: faker.name.lastName(),
      genre: genres[person.id % 2],
      birth: moment(faker.date.past(1, new Date())).format('DD-MM'),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      jobArea: faker.name.jobArea()
    })
  })
}

async function createFamily (families) {
  families.forEach(async family => {
    await Family.create({
      person1_id: family.head1,
      person2_id: family.head2,
      country: faker.address.country()
    })
  })
}

async function createParentage (parentages) {
  parentages.forEach(async parentage => {
    await Parentage.create({
      person1_id: parentage.person1,
      person2_id: parentage.person2,
      role1: parentage.role1,
      role2: parentage.role2,
      family_id: parentage.family
    })
  })
}

async function main () {
  const { people, families, parentages } = runGenerator(10)
  await createPeople(people)
  await createFamily(families)
  await createParentage(parentages)
}

main()
  .then(() => console.log('Registros criados com sucesso!'))
  .catch(error => console.log('Ops! Ocorreu um erro...', error))

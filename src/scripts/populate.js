require('../database')

const { Person, Family, Parentage } = require('../app/models')
const faker = require('faker/locale/pt_BR')

const genres = ['Masculino', 'Feminino', 'Outro']
const roles1 = ['Avô/Avó', 'Pai/Mãe', 'Tio/Tia', 'Irmão/Irmã', 'Companheiro(a)']
const roles2 = ['Neto(a)', 'Filho(a)', 'Sobrinho(a)', 'Irmão/Irmã', 'Companheiro(a)']

const randomPosition = limit => Math.floor(Math.random() * limit)

async function createPeople (amount) {
  const people = []

  for (let index = 0; index < amount; index++) {
    const genreIndex = randomPosition(3)

    const person = await Person.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      genre: genres[genreIndex],
      birth: faker.date.past(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      jobArea: faker.name.jobArea()
    })

    people.push(person)
  }

  return people
}

async function createFamily (person1, person2) {
  return Family.create({
    person1_id: person1.id,
    person2_id: person2.id,
    country: faker.address.country()
  })
}

async function createParentage (person1, person2, family) {
  const roleIndex = randomPosition(4)

  await Parentage.create({
    person1_id: person1.id,
    person2_id: person2.id,
    role1: roles1[roleIndex],
    role2: roles2[roleIndex],
    family_id: family.id
  })
}

async function main () {
  const [person1, person2] = await createPeople(2)
  const family = await createFamily(person1, person2)
  await createParentage(person1, person2, family)
}

main()
  .then(() => console.log('Registros criados com sucesso!'))
  .catch(error => console.log('Ops! Ocorreu um erro...', error))

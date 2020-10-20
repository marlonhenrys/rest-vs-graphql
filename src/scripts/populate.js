require('../database')

const moment = require('moment')
const faker = require('faker/locale/pt_BR')
const runGenerator = require('../app/helpers/dataGenerator')
const { Person, Family, Parentage, Address, Finance, Vehicle } = require('../app/models')

const genres = ['Masculino', 'Feminino', 'Outro']

async function createAddress(quantity) {
  for(let i = 0; i < quantity; i++) {
    await Address.create({
      country: faker.address.country(),
      state: faker.address.state(),
      city: faker.address.city(1).split(' ')[1],
      zip_code: faker.address.zipCode(),
      street_name: faker.address.streetName(),
      time_zone: faker.address.timeZone(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()
    })
  }
}

async function createPeople (people) {
  let addressId = 1;
  for (const person of people) {
    await Person.create({
      firstName: person.firstName,
      lastName: faker.name.lastName(),
      genre: genres[person.id % 2],
      birth: moment(faker.date.past(1, new Date())).format('DD-MM'),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      jobArea: faker.name.jobArea(),
      address_id: addressId,
      cpf: Math.random() * (99999999999 - 10000000000) + 10000000000
      
    })
    addressId++;
  }
}

async function createVehicle (quantity) {
  let personId = 1;
  for(let i = 0; i < quantity; i++) {
    await Vehicle.create({
      model: faker.vehicle.model(),
      type: faker.vehicle.type(),
      fuel: faker.vehicle.fuel(),
      color: faker.vehicle.color(),
      manufacturer: faker.vehicle.manufacturer(),
      person_id: personId
    })
    personId++;
  }
}

async function createFinance (quantity) {
  let personId = 1;
  for(let i = 0; i < quantity; i++) {
    await Finance.create({
      currency_code: faker.finance.currencyCode(),
      currency_name: faker.finance.currencyName(),
      currency_symbol: faker.finance.currencySymbol(),
      person_id: personId
    })
    personId++;
  }
}

async function createFamily (families) {
  for (const family of families) {
    await Family.create({
      person1_id: isNaN(family.head1) ? null : family.head1 + 1,
      person2_id: isNaN(family.head2) ? null : family.head2 + 1,
      country: faker.address.country()
    })
  }
}

async function createParentage (parentages) {
  for (const parentage of parentages) {
    try {
      await Parentage.create({
        person1_id: parentage.person1 + 1,
        person2_id: parentage.person2 + 1,
        role1: parentage.role1,
        role2: parentage.role2,
        family_id: parentage.family + 1
      })
    } catch (error) {
      console.log(error.message, parentage)
    }
  }
}

async function main (quantity) {
  console.log('Criando registros...')
  const { people, families, parentages } = runGenerator(quantity)
  await createAddress(quantity*10)
  await createPeople(people)
  await createVehicle(quantity*10)
  await createFinance(quantity*10)
  await createFamily(families)
  await createParentage(parentages)
}

main(1000)
  .then(() => console.log('Registros criados com sucesso!'))
  .catch(error => console.log('Ops! Ocorreu um erro.', error))

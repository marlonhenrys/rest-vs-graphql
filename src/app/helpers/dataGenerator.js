const faker = require('faker')

const roles1 = ['Avô/Avó', 'Pai/Mãe', 'Tio/Tia', 'Irmão/Irmã', 'Companheiro(a)']
const roles2 = ['Neto(a)', 'Filho(a)', 'Sobrinho(a)', 'Irmão/Irmã', 'Companheiro(a)']

const generateFirstPeople = (quantityPerGen) => {
  const people = [[]]
  for (let i = 0; i < quantityPerGen; i++) {
    for (let j = 0; j < 10; j++) {
      people[0].push({
        id: j,
        firstName: faker.name.firstName(j % 2 === 1 ? 'female' : 'male'),
        families: [j],
        parents: [],
        uncles: [],
        grandparents: [],
        sibling: null
      })
    }
  }
  return people
}

const generateFirstMariages = (people) => {
  const males = people[0].filter(person => person.id % 2 === 0)
  const females = people[0].filter(person => person.id % 2 === 1)
  const mariages = []
  for (let i = 0; i < 5; i++) {
    mariages.push([
      {
        ...males[i],
        partner: females[i].id,
        families: [males[i].families[0], 10 + i]
      },
      {
        ...females[i],
        partner: males[i].id,
        families: [females[i].families[0], 10 + i]
      }])
  }
  return mariages
}

const generatePerson = (mariage, id) => {
  return {
    id,
    firstName: faker.name.firstName(id % 2 === 1 ? 'female' : 'male'),
    parents: [mariage[0].id, mariage[1].id],
    families: Array.from(new Set(mariage[0].families.concat(mariage[1].families))),
    parentFamily: mariage[0].families.reduce((a, b) => Math.max(a, b)),
    sibling: id % 2 === 0 ? id + 1 : id - 1,
    uncles: [mariage[0].sibling, mariage[1].sibling],
    grandparents: [mariage[0].parents, mariage[1].parents]
  }
}

const generateChildren = (mariages) => {
  const nextGenNumber = mariages.flatMap(mariage => mariage).map(mariage => mariage.id).reduce((a, b) => Math.max(a, b)) + 1
  const nextGenOfPeople = []
  mariages.forEach((mariage, index) => {
    const boy = generatePerson(mariage, nextGenNumber + (index * 2))
    const girl = generatePerson(mariage, nextGenNumber + (index * 2) + 1)
    nextGenOfPeople.push(boy)
    nextGenOfPeople.push(girl)
  })
  return nextGenOfPeople
}

const generateMariages = (people, nextFamily) => {
  const males = people.filter(person => person.id % 2 === 0)
  const females = people.filter(person => person.id % 2 === 1)
  const mariages = []
  females.reverse()
  females.splice(3, 0, females.splice(2, 1)[0])
  for (let i = 0; i < 5; i++) {
    mariages.push([
      {
        ...males[i],
        partner: females[i].id,
        families: males[0].families.concat([nextFamily + i])
      },
      {
        ...females[i],
        partner: males[i].id,
        families: females[0].families.concat([nextFamily + i])
      }])
  }
  return mariages
}

const getFamilies = (people) => {
  const validPeople = people.filter(person => person.id < people.length - 10)
  const allFamilies = Array.from(new Set(validPeople.flatMap(person => person.families))).sort((a, b) => a - b)
  const detailedFamilies = allFamilies.map(family => {
    return validPeople.filter(person => person.families.reduce((a, b) => Math.max(a, b)) === family)
  })
  return detailedFamilies.map((family, index) => ({
    id: index,
    head1: family[0] ? family[0].id : undefined,
    head2: family[1] ? family[1].id : undefined
  }))
}

const validateParentage = (person1, person2, parentages) => {
  if (!parentages.length) { return true }
  return !parentages.some(parentage => Object.values(parentage).includes(person1) && Object.values(parentage).includes(person2))
}

const getParentage = (people) => {
  const parentages = []
  people.forEach(person => {
    const partner = people.find(per => per.partner === person.id && validateParentage(per.id, person.id, parentages))
    partner && parentages.push({
      person1: person.id,
      person2: partner.id,
      family: person.families.reduce((a, b) => Math.max(a, b)),
      role1: roles1[4],
      role2: roles2[4]
    })
    const sibling = people.find(per => per.sibling === person.id && !parentages.some(p => p.person1 === per.id && p.person2 === person.id))
    sibling && parentages.push({
      person1: person.id,
      person2: sibling.id,
      family: person.parentFamily,
      role1: roles1[3],
      role2: roles2[3]
    })
    const parents = people.filter(per => person.parents.includes(per.id))
    parents.length && parents.forEach(parent => {
      parentages.push({
        person1: person.id,
        person2: parent.id,
        family: person.parentFamily,
        role1: roles2[1],
        role2: roles1[1]
      })
    })
    const uncles = people.filter(per => person.uncles.includes(per.id))
    uncles.length && uncles.forEach((uncle, index) => {
      parentages.push({
        person1: person.id,
        person2: uncle.id,
        family: people.find(p => p.id === uncles[index].parents[0]).families.reduce((a, b) => Math.max(a, b)),
        role1: roles2[2],
        role2: roles1[2]
      })
    })
    const grandparents = people.filter(per => person.grandparents.flatMap(grandparent => grandparent).includes(per.id))
    grandparents.length && grandparents.forEach(grandparent => {
      parentages.push({
        person1: person.id,
        person2: grandparent.id,
        family: grandparent.families.reduce((a, b) => Math.max(a, b)),
        role1: roles2[0],
        role2: roles1[0]
      })
    })
  })
  return parentages
}

const runGenerator = (quantity) => {
  const people = generateFirstPeople(1)
  const firstMariages = generateFirstMariages(people)
  const spreadPeople = people.flatMap(person => person)
  firstMariages.reverse()
  firstMariages.forEach(mariage => {
    people[0][mariage[0].id - (spreadPeople.length - 10)].partner = mariage[1].id
    people[0][mariage[1].id - (spreadPeople.length - 10)].partner = mariage[0].id
    people[0][mariage[0].id - (spreadPeople.length - 10)].families = mariage[0].families
    people[0][mariage[1].id - (spreadPeople.length - 10)].families = mariage[1].families
  })
  people.push(generateChildren(firstMariages))
  for (let i = 0; i < (quantity - 2); i++) {
    const allPeople = people.flatMap(person => person)
    const nextCouplesStart = allPeople.length - 10
    const nextCouples = allPeople.filter(person => person.id >= nextCouplesStart)
    const nextFamily = Array.from(new Set(allPeople.flatMap(person => person.families))).reduce((a, b) => Math.max(a, b))
    const mariages = generateMariages(nextCouples, nextFamily + 1)
    mariages.reverse()
    mariages.forEach(mariage => {
      people[i + 1][mariage[0].id - (allPeople.length - 10)].partner = mariage[1].id
      people[i + 1][mariage[1].id - (allPeople.length - 10)].partner = mariage[0].id
      people[i + 1][mariage[0].id - (allPeople.length - 10)].families = mariage[0].families
      people[i + 1][mariage[1].id - (allPeople.length - 10)].families = mariage[1].families
    })
    people.push(generateChildren(mariages))
  }

  const families = getFamilies(people.flatMap(person => person))

  const parentages = getParentage(people.flatMap(person => person))

  return {
    people: people.flatMap(person => person),
    families,
    parentages
  }
}

module.exports = (quantity) => {
  return runGenerator(quantity)
}

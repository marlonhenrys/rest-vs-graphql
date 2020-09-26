const entityRepository = require('../../repositories/EntityRepository')

module.exports = () => {
  
  // handle entities

  return entityRepository.findAll()
}

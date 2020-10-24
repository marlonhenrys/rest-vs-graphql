const personController = require('./personController')
const familyController = require('./familyController')

module.exports = {
  ...familyController,
  ...personController
}

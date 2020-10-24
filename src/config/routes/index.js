const { Router } = require('express')

const routes = Router()

routes.use(require('./person.routes'))
routes.use(require('./parentage.routes'))
routes.use(require('./family.routes'))
routes.use(require('./address.routes'))
routes.use(require('./vehicle.routes'))
routes.use(require('./finance.routes'))

module.exports = routes

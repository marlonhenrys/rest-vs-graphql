const { Router } = require('express')

const routes = Router()

routes.use(require('./person.routes'))

module.exports = routes

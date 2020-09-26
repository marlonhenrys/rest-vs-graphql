const { Router } = require('express')

const routes = Router()

routes.use(require('./entity.routes'))

module.exports = routes

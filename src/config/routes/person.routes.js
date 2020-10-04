const { Router } = require('express')
const { personController } = require('../../app/controllers/api/rest')

const routes = Router()

routes.get('/people', personController.index)
routes.get('/people/:id', personController.show)

module.exports = routes

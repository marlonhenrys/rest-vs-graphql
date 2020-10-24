const { Router } = require('express')
const { financeController } = require('../../app/controllers/api/rest')

const routes = Router()

routes.get('/people/:personId/finances', financeController.index)
routes.get('/people/:personId/finances/:id', financeController.show)

module.exports = routes

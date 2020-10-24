const { Router } = require('express')
const { vehicleController } = require('../../app/controllers/api/rest')

const routes = Router()

routes.get('/people/:personId/vehicles', vehicleController.index)
routes.get('/people/:personId/vehicles/:id', vehicleController.show)

module.exports = routes

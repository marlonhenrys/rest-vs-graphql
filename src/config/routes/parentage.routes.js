const { Router } = require('express')
const { parentageController } = require('../../app/controllers/api/rest')

const routes = Router()

routes.get('/people/:personId/parentages', parentageController.index)
routes.get('/people/:personId/parentages/:id', parentageController.show)

module.exports = routes

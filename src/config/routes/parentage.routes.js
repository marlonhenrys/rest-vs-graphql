const { Router } = require('express')
const { parentageController } = require('../../app/controllers/api/rest')

const routes = Router()

routes.get('/people/:personId/parentages', parentageController.index)
routes.get('/people/:personId/parentages/:id', parentageController.show)
routes.get('/families/:familyId/parentages', parentageController.indexByFamily)
routes.get('/families/:familyId/parentages/:id', parentageController.showByFamily)

module.exports = routes

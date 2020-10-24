const { Router } = require('express')
const { familyController } = require('../../app/controllers/api/rest')

const routes = Router()

routes.get('/families', familyController.index)
routes.get('/families/:id', familyController.show)
routes.get('/people/:personId/headfamily', familyController.headFamily)

module.exports = routes

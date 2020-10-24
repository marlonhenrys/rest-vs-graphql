const { Router } = require('express')
const { personController } = require('../../app/controllers/api/rest')

const routes = Router()

routes.get('/people', personController.index)
routes.get('/people/:id', personController.show)
routes.get('/all', personController.indexWithAll)
routes.get('/people/:id/all', personController.showWithAll)

module.exports = routes

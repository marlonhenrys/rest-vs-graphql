const { Router } = require('express')
const { addressController } = require('../../app/controllers/api/rest')

const routes = Router()

routes.get('/addresses', addressController.index)
routes.get('/addresses/:id', addressController.show)

module.exports = routes

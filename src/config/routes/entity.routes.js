const { Router } = require('express')
const { EntityController } = require('../../app/controllers/api/rest')

const routes = Router()

// /api/rest/entities

routes.get('/entities', EntityController.index)

module.exports = routes

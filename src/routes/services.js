const servicesController = require('../controllers/ServicesController');
const express = require('Express');
const routes = express.Router();

routes.get('/',servicesController.index);

module.exports = routes;

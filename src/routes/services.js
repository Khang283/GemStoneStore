const servicesController = require('../controllers/ServicesController');
const express = require('Express');
const { route } = require('./login');
const routes = express.Router();

routes.get('/edit/:_id',servicesController.edit);
routes.put('/update/:_id',servicesController.update);
routes.delete('/delete/:_id',servicesController.delete);
routes.post('/new/create', servicesController.create);
routes.get('/new',servicesController.new);
routes.get('/',servicesController.index);

module.exports = routes;

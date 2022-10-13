const express = require('Express');
const routes = express.Router();
const commonController = require('../controllers/CommonController');

routes.get('/', commonController.home);

module.exports = routes;

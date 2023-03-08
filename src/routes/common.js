const express = require('express');
const routes = express.Router();
const commonController = require('../controllers/CommonController');

routes.get('/', commonController.home);

module.exports = routes;

const express = require('Express');
const app = express();
const route = express.Router();
const loginController = require('../controllers/LoginController');

route.post('/new/create', loginController.create);
route.get('/new', loginController.new);
route.get('/', loginController.index);

module.exports = route;

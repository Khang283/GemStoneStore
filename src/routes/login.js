const express = require('Express');
const app = express();
const route = express.Router();
const loginController = require('../controllers/LoginController');

route.get('/logout', loginController.logout);
route.get('/private',loginController.private);
route.post('/check', loginController.login);
route.post('/new/create', loginController.create);
route.get('/new', loginController.new);
route.get('/', loginController.index);

module.exports = route;

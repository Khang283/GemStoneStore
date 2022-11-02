const productsController = require('../controllers/ProductsController');
const express = require('Express');
const routes = express.Router();

routes.get('/restore/:_id', productsController.restore)
routes.get('/restore',productsController.trash);
routes.delete('/delete/:_id', productsController.delete);
routes.put('/update/:_id', productsController.update);
routes.get('/edit/:_id', productsController.edit);
routes.post('/new/create', productsController.create);
routes.get('/new', productsController.new);
routes.get('/detail/:_id', productsController.detail);
routes.get('/:page', productsController.index);
routes.get('/', productsController.defaultIndex);

module.exports = routes;

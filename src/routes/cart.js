const express = require('Express');
const route = express.Router();
const CartController=require('../controllers/CartController');

route.delete('/delete/:_id', CartController.delete);
route.post('/add/:_id',CartController.addItem);
route.get('/',CartController.index);

module.exports=route;

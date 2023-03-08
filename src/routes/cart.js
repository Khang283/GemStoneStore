const express = require('express');
const route = express.Router();
const CartController=require('../controllers/CartController');
const Cart = require('../models/Cart');

route.put('/reduce/:_id', CartController.reduceItem);
route.put('/inc/:_id', CartController.incItem);
route.delete('/delete/:_id', CartController.delete);
route.post('/add/:_id',CartController.addItem);
route.get('/',CartController.index);

module.exports=route;

const Cart=require("../models/Cart");
const Product=require('../models/Product');
const jwt=require("jsonwebtoken");
const shared=require('./ShareFunction');
const { param } = require("../routes/login");
const ObjectId=require('mongoose').Schema.ObjectId;
class CartController{

    //[GET] /cart
    index(req, res){
        try{
            const account=shared.verifyToken(req.session);
            if(account){
                Cart.findOne({userID: account._id},(err,cart)=>{
                    //console.log(cart.items);
                    let sp=new Array();
                    if(cart.items!==null){
                        cart.items.forEach(element => {
                            sp.push(element);
                        });
                        console.log(sp);
                         return res.render('cart', {cart,sp, account});
                    }
                    else{
                        return res.status(404).send("Không tìm thấy giỏ hàng")
                    }
                    
                }).lean();
            }
        }
        catch{
            return res.status(404).send("Bạn chưa đăng nhập");
        }
    }

    //[POST] cart/additem/:_id
    addItem(req, res){
        try{
            const account=shared.verifyToken(req.session);
            if(account){
                Cart.findOne({userID: account._id},(err, cart)=>{
                    if(cart){
                        const itemId=req.params._id;
                        const cartId=cart.id
                        console.log(cartId);
                        Product.findById(itemId, (err, product) => {
                            if (!product) {
                                return res.status(404).send("Không tìm thấy sản phẩm");
                            }
                            else {
                                var sp = { item: product, quantity: 1, price: product.price };
                                var tongTien = parseInt(cart.totalPrice) + parseInt(product.price);
                                var tongSL = parseInt(cart.totalQuantity) + 1;
                                var giaTien= parseInt(product.price);
                                console.log(tongSL + ' ' + tongTien);
                                Cart.findOne({ _id: cartId, items: { $elemMatch: { item: product } } }, (err, cart) => {
                                    console.log(cart);
                                    if (!cart) {
                                        //console.log(cart.id);
                                        //Push sp mới vào cart
                                        Cart.findOneAndUpdate(
                                            { _id: cartId },
                                            {
                                                $push: { items: sp },
                                                $set: { totalPrice: tongTien, totalQuantity: tongSL }
                                            }, // tăng tổng tiền và số lượng tổng 
                                            { upsert: true, new: true }, (err, gioHang) => {
                                                console.log(gioHang);
                                                return res.send("Đã thêm sản phẩm vào giỏ hàng");
                                            });
                                    }
                                    else {
                                        //console.log(cart.id);
                                        //Tăng số lượng sp trong cart
                                        Cart.findOneAndUpdate(
                                            { _id: cartId, items: { $elemMatch: { item: product } } },
                                            {
                                                $inc: { 'items.$.quantity': 1, 'items.$.price': giaTien },
                                                $set: {
                                                    totalPrice: tongTien,
                                                    totalQuantity: tongSL,
                                                },
                                            }, //tăng số lượng của sp vừa thêm
                                            { upsert: true, new: true },
                                            (err, gioHang) => {
                                                console.log(gioHang);
                                                return res.send("Đã tăng số lượng trong giỏ hàng");
                                            });
                                    }
                                });
                            }
                        });
                    }
                    else{
                        const itemId=req.params._id;
                        const userId=account._id;
                        Product.findById(itemId, (err, product) => {
                            if (!product) {
                                return res.status(404).send("Không tìm thấy sản phẩm");
                            }
                            else {
                                const cart = new Cart({
                                    userID: userId,
                                    items: [{
                                        item: product,
                                        quantity: 1,
                                        price: parseInt(product.price) ,
                                    }],
                                    totalPrice: product.price,
                                    totalQuantity: 1,
                                });
                                cart.save((err, cart) => {
                                    res.json(cart);
                                });
                            }
                        });
                    } 
                });
            }
        }
        catch{
            res.status(404).send("Bạn chưa đăng nhập");
        }
    }

    //[DELETE] cart/delete/:_id
    delete(req, res){
        try{
            const account=shared.verifyToken(req.session);
            const productID=req.params._id
            if(account){
                Cart.findOne({userID: account._id},(err, cart)=>{
                    if(cart){
                        //console.log(cart.id);
                        //console.log(cart.items);
                        let cartID= cart.id;
                        var itemId, itemQuantity;
                        //Tìm id của item trong mảng
                        cart.items.every(sp => {
                            if(sp.item.id===productID){
                                itemId=sp.id;
                                itemQuantity=sp.quantity;
                                return false;
                            }
                        });
                        Product.findById(productID,(err, product)=>{
                            if(product){
                                let price=parseInt(cart.totalPrice)-(product.price*itemQuantity);
                                let quantity=parseInt(cart.totalQuantity)-itemQuantity;
                                //console.log(itemId);
                                Cart.findOneAndUpdate(
                                    {_id: cartID, items: {$elemMatch: {item: product}}},
                                    {$pull: {items: {_id: itemId}},
                                    $set: {totalPrice: price, totalQuantity: quantity}},
                                    {upsert: true, safe: true, multi: true},
                                    (err, gioHang)=>{
                                        if(err){
                                            return res.status(404).send("Đã xảy ra lỗi khi tìm sản phẩm trong giỏ hàng");
                                        }
                                        else if(gioHang){
                                            return res.status(200).redirect("/cart");
                                        }
                                        else{
                                            return res.status(404).send("Không tìm thấy sản phẩm");
                                        }
                                    })
                            }
                            else{
                                return res.status(404).send("Không tìm thấy sản phẩm")
                            }
                        })
                        
                    }
                    else{
                        return res.status(404).send("Giỏ hàng không tồn tại")
                    }
                })
            }
        }
        catch{
            return res.status(404).send("Bạn chưa đăng nhập");
        }
    }

    
}



module.exports = new CartController();
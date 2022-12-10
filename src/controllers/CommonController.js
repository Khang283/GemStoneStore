const shared=require('./ShareFunction');
const cookies_session=require('cookie-session');
const Product =require('../models/Product');

class CommonController {
    //[GET]
    home(req, res) {
       try{
            var account=shared.verifyToken(req.session);
            if(account){
                let random=Math.random();
                Product.find().skip(random).limit(8).lean().exec((err, product)=>{
                    //product=product.map((p)=>p.toObject());   //cant use this if use lean()
                    res.render('home', {account, product});
                });
            }
       }
       catch(err){
            var account={
                username: "None",
                role: "USER",
            };
            let random=Math.ceil(Math.random()*10);
                Product.find().skip(random).limit(8).lean().exec((err, product)=>{
                    //product=product.map((p)=>p.toObject()); 
                    res.render('home', {product});
                });
       }
    }
}

module.exports = new CommonController();

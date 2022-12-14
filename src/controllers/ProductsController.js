const Products = require('../models/Product');
const cookie=require('cookie');
const jwt=require('jsonwebtoken');
const shared=require('./ShareFunction');

class ProductsController {
    //GET /products/detail
    detail(req, res) {
        const id = req.params._id;
        try{
            const account =shared.verifyToken(req.session);
            if(account){
                Products.findById(id, function (err, products) {
                    products = products.toObject();
                    res.render('products_detail', { products, account });
                    //res.json(products);
                });
            }
        }
        catch{
            Products.findById(id, function (err, products) {
                products = products.toObject();
                res.render('products_detail', { products });
                //res.json(products);
            });
        }
        
    }

    //[GET] /products/:page
    index(req, res) {
        try {
            var account=shared.verifyToken(req.session);
            if (account) {
                const page = req.params.page; //chỉ số trang đầu tiên
                const perPage = 8; //số document tối đa trong 1 trang
                Products.find() //tìm tất cả document
                    .skip(page * perPage - perPage) //skip 0 do là trang đầu tiên
                    .limit(perPage) //giới hạn số document
                    .exec((err, products) => {
                        products = products.map((products) => products.toObject()); //đưa tất cả các doc tìm dc về dạng object
                        Products.count({}, (err, count) => {   //đếm số doc
                            const limitPage = Math.ceil(count / perPage); //phân trang
                            //console.log(role);
                            res.render('products', { limitPage, products, page, account});    //trả về doc và phân trang
                            //console.log(products);
                        });
                    })
            }
        }
        catch (err) {
            const page = req.params.page; //chỉ số trang đầu tiên
            const perPage = 8; //số document tối đa trong 1 trang
            Products.find() //tìm tất cả document
                .skip(page * perPage - perPage) //skip 0 do là trang đầu tiên
                .limit(perPage) //giới hạn số document
                .exec((err, products) => {
                    products = products.map((products) => products.toObject()); //đưa tất cả các doc tìm dc về dạng object
                    Products.count({}, (err, count) => {   //đếm số doc
                        const limitPage = Math.ceil(count / perPage); //phân trang
                        //console.log(role);
                        res.render('products', { limitPage, products, page });    //trả về doc và phân trang
                        //console.log(products);
                    });
                })
        }
    }

    //GET /products
    defaultIndex(req, res) {
        try {
            var account=shared.verifyToken(req.session);
            if (account) {
                const page = 1; //chỉ số trang đầu tiên
                const perPage = 8; //số document tối đa trong 1 trang
                Products.find() //tìm tất cả document
                    .skip(page * perPage - perPage) //skip 0 do là trang đầu tiên
                    .limit(perPage) //giới hạn số document
                    .exec((err, products) => {
                        products = products.map((products) => products.toObject()); //đưa tất cả các doc tìm dc về dạng object
                        Products.count({}, (err, count) => {   //đếm số doc
                            const limitPage = Math.ceil(count / perPage); //phân trang
                            //console.log(account.username);
                            res.render('products', { limitPage, products, page, account });    //trả về doc và phân trang
                            //console.log(products);
                        });
                    })
            }
        }
        catch (err) {
            const page = 1; //chỉ số trang đầu tiên
            const perPage = 8; //số document tối đa trong 1 trang
            Products.find() //tìm tất cả document
                .skip(0) //skip 0 do là trang đầu tiên
                .limit(perPage) //giới hạn số document
                .exec((err, products) => {
                    products = products.map((products) => products.toObject()); //đưa tất cả các doc tìm dc về dạng object
                    Products.count({}, (err, count) => {   //đếm số doc
                        const limitPage = Math.ceil(count / perPage); //phân trang
                        //console.log(account.username);
                        res.render('products', { limitPage, products, page });    //trả về doc và phân trang
                        //console.log(products);
                    });
                })
        }
    }

    //[GET] /products/new
    new(req, res) {
        res.render('products_new');
    }

    //[POST] /products/new/create
    create(req, res) {
        const formData = req.body;
        console.log(formData);
        const products = new Products(formData);
        products.save(()=>{
            res.redirect('/products');
        });
    }

    //[GET] /products/edit/:_id
    edit(req, res) {
        const productId = req.params._id;
        Products.findById(productId, (err, products) => {
            if (err) {
                res.send('Error');
            } else {
                products = products.toObject();
                res.render('products_edit', { products });
            }
        });
    }

    //[PUT] /products/update:_id
    update(req, res) {
        const product = req.body;
        const productId = req.params._id;
        const productUpdate = Products.findById(productId);
        Products.findOneAndUpdate(productUpdate, product, (err, products) => {
            res.redirect('/products');
        });
    }

    //[DELETE] /products/delete/:_id
    delete(req, res) {
        const productId = req.params._id;

        //soft delete 
        Products.delete({ _id: productId }, (err, products) => {
            res.redirect('/products');
        });
        
        //Restore
        /*Products.restore({_id: proudctId},(err, products)=>{
            res.redirect('/products/:page');
        }); */
    }

    //  [GET] products/restore
    trash(req,res){
        Products.findDeleted((err,products)=>{
            products = products.map((products) => products.toObject());
            res.render('products_restore',{ products });
        })
        
    }

    // [GET] products/restore/:_id
    restore(req,res) {
        const productId=req.params._id;
        Products.restore({_id: productId},(err, products)=>{
            res.redirect('/products');
        })
    }
}

module.exports = new ProductsController();

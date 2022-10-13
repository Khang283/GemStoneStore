const Products = require('../models/Product');

class ProductsController {
    //GET /products/detail
    detail(req, res) {
        const id = req.params._id;
        Products.findById(id, function (err, products) {
            products = products.toObject();
            res.render('products_detail', { products });
            //res.json(products);
        });
    }

    //[GET] /products/:page
    index(req, res){
        const page=req.params.page; //chỉ số trang
        const perPage=4; //số document tối đa trong 1 trang
        Products.find() //tìm tất cả document
        .skip(page*perPage-perPage) //skip tới document cần hiển thị
        .limit(perPage) //giới hạn số document
        .exec((err,products)=>{
            products = products.map((products) => products.toObject()); //đưa tất cả các doc tìm dc về dạng object
            Products.count({},(err, count)=>{   //đếm số doc
                const limitPage = Math.ceil(count/perPage); //phân trang
                res.render('products', { limitPage, products });    //trả về doc và phân trang
                console.log(products);
            });
        })
    }

    //GET /products
    defaultIndex(req, res) {
        const page=1; //chỉ số trang đầu tiên
        const perPage=4; //số document tối đa trong 1 trang
        Products.find() //tìm tất cả document
        .skip(page*perPage-perPage) //skip 0 do là trang đầu tiên
        .limit(perPage) //giới hạn số document
        .exec((err,products)=>{
            products = products.map((products) => products.toObject()); //đưa tất cả các doc tìm dc về dạng object
            Products.count({},(err, count)=>{   //đếm số doc
                const limitPage = Math.ceil(count/perPage); //phân trang
                res.render('products', { limitPage, products });    //trả về doc và phân trang
                console.log(products);
            });
        })
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
        products.save();
        res.redirect('/products');
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
        const page = req.params.page;
        Products.deleteOne({ _id: productId }, (err, products) => {
            res.redirect('/products/:page');
        });
    }
}

module.exports = new ProductsController();

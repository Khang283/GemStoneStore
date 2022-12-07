const loginRoutes = require('./login');
const productsRoutes = require('./products');
const commonRoutes = require('./common');
const servicesRoutes = require('./services');
const cartRoutes=require('./cart');

function Routes(app) {
    //OVERRRIDE METHOD FOR DELETE
    app.use((req, res, next) => {
        if (req.query._method == 'DELETE') {
            req.method = 'DELETE';
            req.url = req.path;
        }
        next();
    });

    //CART
    app.use('/cart',cartRoutes)

    //Services 
    app.use('/services', servicesRoutes);

    //Product 
    app.use('/products', productsRoutes);

    //Login
    app.use('/login', loginRoutes);

    // Default
    app.use('/home', commonRoutes);
    app.use('/', commonRoutes);

}

module.exports = Routes;

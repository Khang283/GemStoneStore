const Services = require('../models/Service');

class ServicesController {


    //[GET] index 
    index(req, res){
        Services.find({}, (err,services)=>{
            services=services.map(services => services.toObject());
            res.render('services', { services });
        })
    }
}

module.exports = new ServicesController();
const Services = require('../models/Service');

class ServicesController {

    //[PUT] /services/edit/:_id
    update(req, res){
        const serviceId=req.params._id;
        const serviceUpdate=Services.findById(serviceId);
        const service=req.body;
        Services.findOneAndUpdate(serviceUpdate, service, (err,service)=>{
            res.redirect('/services');
        })
    }

    //[GET] /services/edit
    edit(req, res){
        const serviceId=req.params._id;
        const services = Services.findById({_id: serviceId},(err, services)=>{
            services=services.toObject();
            res.render('services_edit',{services});
        });
        
    }

    //[DELETE] /services/delete/:_id
    delete(req,res){
        const serviceId = req.params._id;
        Services.deleteOne({_id: serviceId},(err, service)=>{
            res.redirect('/services');
        });
    }

    //[POST] /new/create
    create(req,res){
        const formData=req.body;    
        console.log(formData);
        const service = new Services(formData);
        service.save().then(()=>{
            res.redirect('/services');
        });
        
    }

    //[GET] /new
    new(req,res){
        res.render('services_new');
    }

    //[GET] index 
    index(req, res){
        Services.find({}, (err,services)=>{
            services=services.map(services => services.toObject());
            res.render('services', { services });
        })
    }

    
}

module.exports = new ServicesController();
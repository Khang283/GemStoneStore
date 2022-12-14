const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId;

const Service = new Schema(
    {
        serviceId:{
            type: ObjectId,
        },
        name: {
            type: String,
            max: 50,
            require: true,
        },
        price: {
            type: String,
            max: 20,
            require: true,
        },
        finish_time:{
            type: String,
            default: 1,
        },
        product_type: {
            type: String,
            max: 255,
        },
    }, 

    {
        timestamp: true,
    },
);

module.exports = mongoose.model('Service', Service);
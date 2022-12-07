const mongoose = require('mongoose');
const mongoose_delete=require('mongoose-delete');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    productId: { type: ObjectId },
    name: { type: String, required: true, max: 255 },
    description: { type: String, max: 800 },
    image: { type: String, max: 255 },
    price: { type: String, default: 0 },
    type: { type: String, max: 25 },
    material: { type: String, max: 25, default: 'Silver' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

Product.plugin(mongoose_delete,{overrideMethods: 'all'});

module.exports = mongoose.model('Product', Product);

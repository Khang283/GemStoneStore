const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const ProductSchema = new Schema({
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

const Cart=new Schema({
    cartID : {type: ObjectId},
    userID: {type: String, require: true, },
    items: [{item: ProductSchema, quantity: Number,}],
    totalPrice: {type: Number},
    totalQuantity: {type: Number},
},
{
    timestamps: true,
});


module.exports=mongoose.model("Cart", Cart);
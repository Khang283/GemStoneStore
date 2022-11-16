const mongoose = require('mongoose');
require('dotenv').config({path: './.env'});

const URL = process.env.DATABASE_URL;
async function connect() {
    try {
        await mongoose.connect("mongodb+srv://gemstonestore:gemstonestore123456@cluster0.efw7idq.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect fail');
    }
}

module.exports = { connect };

const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: './.env'});

const URL = process.env.DATABASE_URL;
async function connect() {
    try {
        await mongoose.connect(URL,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect fail');
    }
}

module.exports = { connect };

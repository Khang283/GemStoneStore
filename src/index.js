const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const routes = require('./routes');
const cookies_session=require('cookie-session');
const app = express();
const db = require('./models/connection');
const { options } = require('./routes/login');
const cookieSession=require('cookie-session');
const jwt =require('jsonwebtoken');
const PORT = 5001;
const dotenv=require('dotenv').config({path: '.env'});

//CONNECT TO DB
db.connect();

//USE STATIC FILES
app.use(express.static(path.join(__dirname, 'resources')));

//FOR USING JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//METHOD OVERIDE
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method-Override'));

//FOR DEBUG
app.use(morgan('combined'));

//HANDLEBARS TEMPLATE
app.engine('handlebars', engine({
    //HELPERS FUNCTION
    helpers: {
        indexNum(a,b) { return a+b; },
        previousPage(a){
            if(a==1){
                return 1;
            }
            else{
                return a-1;
            }
        },
        nextPage(a,b){
            if(a==b){
                return a;
            }
            else{
                return ++a;
            }
        },
        listPagination(a) {
            var b=new Array();
            for(var i = 0;i<a; i++){
                b[i] = i+1;
            }
            return b;
        },
        //HELPER giúp chỉnh view theo role
        checkUser(user, options){
            if(user==="ADMIN"){
                return options.fn(this);
            }
            else{
                return options.inverse(this);
            }
        },
        isUserExist(user, options){
            if(user!=null){
                return options.fn(this);
            }
            else{
                return options.inverse(this);
            }
        },
        isEmptyCart(a, options){
            if(a==0){
                return options.fn(this);
            }
            else{
                return options.inverse(this);
            }
        }
    }}
));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/view'));
app.use(cookies_session({
    name: 'cookie',
    keys: ['login'],
    maxAge: 24 * 60 * 60 * 1000,
}));

//Routes
routes(app);

let server = app.listen(process.env.PORT || PORT, () => {
    console.log(`Server start on port ${server.address().port}`);
});

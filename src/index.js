const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const routes = require('./routes');
const app = express();
const db = require('./models/connection');
const PORT = 5001;
require('dotenv').config({path: '.env'});

//CONNECT TO DB
db.connect();

//USE STATIC FILES
app.use(express.static(path.join(__dirname, 'resources')));
console.log(path.join(__dirname, 'node_modules/bootstrap/dist'));

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
        listPagination(a) {
            const b=new Array();
            for(var i = 0;i<a; i++){
                b[i] = i+1;
            }
            return b;
        },
    }}
));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/view'));

//Routes
routes(app);

let server = app.listen(process.env.PORT || PORT, () => {
    console.log(`Server start on port ${server.address().port}`);
});

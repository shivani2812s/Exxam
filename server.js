const express=require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.port;
const path = require('path');
const Tesseract = require('tesseract.js');
const hbs = require('hbs');
hbs.registerHelper('increment', function(value) {
    return value + 1;
});
const bodyParser=require('body-parser');
const router = require('./router/route');
const questionRouter=require('./router/questions');
const staticPath = path.join(__dirname, "./static");
const viewPath = path.join(__dirname, "./views");
const layoutPath = path.join(__dirname, "./views/layout");
app.set('views', viewPath);
app.set('view engine', 'hbs');
app.use(express.static(staticPath));
hbs.registerPartials(layoutPath);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const DB = 'mongodb+srv://shivanis:LGnKDLqr8AK1z50M@cluster0.bddbnlp.mongodb.net/Exam?retryWrites=true&w=majority';
mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connection successful');
}).catch((err) => {
    console.error('Connection failed:', err.message);
});

app.use('/',router);

app.use('/questions',questionRouter);

app.listen(port||3001, () => {
    console.log("Server running on port", port);
});
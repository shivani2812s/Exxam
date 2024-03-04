const express=require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.port;
const path = require('path');
const data=require('./data');
const Tesseract = require('tesseract.js');
const hbs = require('hbs');
const Question=require('./models/questions');
hbs.registerHelper('increment', function(value) {
    return value + 1;
});
hbs.registerHelper('splitOptions', function(optionsString) {
    return optionsString.split(',');
});
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});
hbs.registerHelper('indexInc', function (index) {
    return index + 1;
});
hbs.registerHelper('getOptionIndex', function (index) {
    return index + 1;
});

hbs.registerHelper('getCharForIndex', function (index) {
    return String.fromCharCode(65 + index);
});
const bodyParser=require('body-parser');
const router = require('./router/route');
const questionRouter=require('./router/questions');
const studentRouter=require('./router/students');
const teacherRouter=require('./router/teachers');
const adminRouter=require('./router/admin');
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
app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
app.use('/admin',adminRouter);

app.listen(port||3001, () => {
    console.log("Server running on port", port);
});
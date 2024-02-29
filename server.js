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
hbs.registerHelper('eq', function(a, b) {
    return a === b ? true : false;
});

const bodyParser=require('body-parser');
const router = require('./router/route');
const questionRouter=require('./router/questions');
const studentRouter=require('./router/students');
const teacherRouter=require('./router/teachers');
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



// Question.insertMany(data).then(()=>{
//   console.log("admin stored sucessfully");
//   mongoose.connection.close();
// }).catch((error)=>{
//   console.log(error);
//   mongoose.connection.close();
// })


app.use('/',router);
app.use('/students',studentRouter);
app.use('/questions',questionRouter);
app.use('/teachers',teacherRouter);

app.listen(port||3001, () => {
    console.log("Server running on port", port);
});